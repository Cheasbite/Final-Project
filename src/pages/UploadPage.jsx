
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FileUpload from '@/components/FileUpload.jsx';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext.jsx';
import api, { uploadUrl } from '@/lib/apiClient.js';
import { FileText, File, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const records = await api('uploads.php');
      setDocuments(records);
    } catch (err) {
      console.error('Error fetching public documents:', err);
      // If error occurs (e.g. permission error if listRule isn't strictly public), display graceful failure
      setError(err?.response?.message || err?.message || 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // Utility to check if a file is a PDF
  const isPdf = (filename) => {
    return filename && filename.toLowerCase().endsWith('.pdf');
  };

  return (
    <>
      <Helmet>
        <title>Document Center - The American International Institute USA</title>
        <meta name="description" content="Access our public document gallery or log in to securely upload and manage your own educational resources." />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-grow">
          {/* Hero Section */}
          <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Document Center
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Explore our public gallery of educational resources, or log in to manage your personal document uploads securely.
              </p>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
              
              {/* Private Upload Section (Rendered only if authenticated) */}
              {currentUser && (
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground">Your Workspace</h2>
                    <p className="text-muted-foreground mt-2">Manage your secure documents below.</p>
                  </div>
                  <FileUpload />
                </div>
              )}

              {/* Public Gallery Section */}
              <div className={currentUser ? "pt-12 border-t border-border" : ""}>
                <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-foreground">Public Gallery</h2>
                  <p className="text-muted-foreground mt-2">Browse community and institutional resources.</p>
                </div>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-48 bg-secondary/50 rounded-2xl animate-pulse border border-border" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center p-12 bg-destructive/5 rounded-2xl border border-destructive/20 max-w-2xl mx-auto">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Unable to Load Gallery</h3>
                    <p className="text-muted-foreground mb-6">{error}</p>
                    <Button onClick={fetchDocuments} variant="outline" className="gap-2">
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </Button>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="text-center p-16 bg-secondary/30 rounded-2xl border border-border max-w-2xl mx-auto">
                    <File className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">No documents available</h3>
                    <p className="text-muted-foreground">The public gallery is currently empty. Check back later for new resources.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                      <div 
                        key={doc.id} 
                        className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                            {isPdf(doc.filename) ? <FileText className="w-6 h-6" /> : <File className="w-6 h-6" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate text-lg" title={doc.title}>
                              {doc.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {isPdf(doc.filename) ? 'PDF Document' : 'Text Document'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                          <span className="text-xs font-medium text-muted-foreground">
                            {new Date(doc.uploaded_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => window.open(uploadUrl(doc.filename), '_blank')}
                          >
                            Open <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Call to Action for Unauthenticated Users */}
                {!currentUser && (
                  <div className="mt-24 text-center border-t border-border pt-16">
                    <div className="max-w-2xl mx-auto bg-primary/5 rounded-3xl p-10 border border-primary/10">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        Contribute to our Library
                      </h3>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Join our community of professionals and share your own resources, research, and institutional documents securely.
                      </p>
                      <Button 
                        size="lg" 
                        className="px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" 
                        onClick={() => navigate('/login')}
                      >
                        Login to Upload
                      </Button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default UploadPage;
