
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, FileText, Trash2, Eye, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import api, { uploadUrl } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext.jsx';

const FileUpload = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploads, setUploads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);

  const { currentUser } = useAuth();
  const isAuthenticated = !!currentUser;

  const fetchUploads = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const records = await api('uploads.php');
      setUploads(records);
    } catch (error) {
      console.error('Error fetching uploads:', error);
      const errorMessage = error?.response?.message || error?.message || 'Unknown error occurred';
      toast.error('Failed to load uploads', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.type === 'text/plain') {
        setFile(droppedFile);
      } else {
        toast.error('Invalid file type', {
          description: 'Only PDF and text files are allowed',
        });
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Authentication required', {
        description: 'You must be logged in to upload files.',
      });
      return;
    }

    if (!file || !title) {
      toast.error('Missing fields', {
        description: 'Please provide both a title and a file to upload.',
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      await api('uploads.php', {
        method: 'POST',
        body: formData,
      });

      toast.success('Upload Successful', {
        description: `"${title}" has been saved securely.`,
      });
      
      // Reset form
      setTitle('');
      setFile(null);
      fetchUploads();
    } catch (error) {
      console.error('Error uploading file:', error);
      // Display the specific error message returned by the API to assist with debugging
      const errorMessage = error?.response?.message || error?.message || 'Failed to upload file';
      toast.error('Upload Failed', {
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;

    try {
      await api(`uploads.php?id=${id}`, { method: 'DELETE' });
      toast.success('File deleted successfully');
      fetchUploads();
    } catch (error) {
      console.error('Error deleting file:', error);
      const errorMessage = error?.response?.message || error?.message || 'Unknown error occurred';
      toast.error('Failed to delete file', {
        description: errorMessage,
      });
    }
  };

  const handlePreview = (record) => {
    window.open(uploadUrl(record.filename), '_blank');
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-card rounded-2xl p-12 shadow-lg text-center max-w-2xl mx-auto">
        <LogIn className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-foreground mb-4">Authentication Required</h2>
        <p className="text-muted-foreground text-lg mb-8">
          You must be securely logged in to upload, view, and manage your documents.
        </p>
        <Button asChild size="lg">
          <Link to="/login">Login to Access Documents</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6">Upload Document</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 text-foreground"
              placeholder="Enter document title"
            />
          </div>

          <div>
            <Label>Upload File (PDF or Text)</Label>
            <div
              className={`mt-2 border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-2">
                {file ? file.name : 'Drag and drop your file here'}
              </p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <Input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload">
                <Button type="button" variant="outline" asChild>
                  <span>Browse Files</span>
                </Button>
              </Label>
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: PDF, TXT (Max 20MB)
              </p>
            </div>
          </div>

          <Button type="submit" disabled={isUploading} className="w-full transition-all">
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </Button>
        </form>
      </div>

      <div className="bg-card rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-foreground mb-6">Your Documents</h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((skeleton) => (
              <div key={skeleton} className="h-20 bg-secondary/50 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : uploads.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">No documents uploaded yet</p>
            <p className="text-sm text-muted-foreground">Upload your first document to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center justify-between p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-all duration-200"
              >
                <div className="flex items-center gap-4 flex-grow">
                  <FileText className="w-8 h-8 text-primary shrink-0" />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{upload.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(upload.uploaded_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(upload)}
                    title="View Document"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(upload.id)}
                    title="Delete Document"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
