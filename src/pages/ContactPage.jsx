
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - The American International Institute USA</title>
        <meta name="description" content="Get in touch with The American International Institute USA. We're here to answer your questions and help you start your professional education journey." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Contact Us
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Send Us a Message</h2>
                <ContactForm />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <p className="text-muted-foreground">info@aiinstitute.edu</p>
                        <p className="text-muted-foreground">admissions@aiinstitute.edu</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-muted-foreground">Toll-free: +1 (800) 555-0123</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Address</h3>
                        <p className="text-muted-foreground">
                          123 Education Boulevard<br />
                          Los Angeles, CA 90001<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM PST</p>
                        <p className="text-muted-foreground">Saturday: 9:00 AM - 3:00 PM PST</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
