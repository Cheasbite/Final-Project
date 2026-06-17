
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import { Briefcase, Target, Headphones as HeadphonesIcon, GraduationCap, Users, Award } from 'lucide-react';

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Services - The American International Institute USA</title>
        <meta name="description" content="Discover our comprehensive range of professional services including corporate training, career counseling, and student support." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Comprehensive professional services designed to support your educational journey and career advancement
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ServiceCard
                  title="Corporate Training"
                  description="Transform your organization with customized training programs designed to upskill your workforce and drive measurable business results."
                  icon={Briefcase}
                  features={[
                    'Custom curriculum development aligned with your business goals',
                    'Expert instructors with extensive industry experience',
                    'Flexible delivery formats including on-site, virtual, and hybrid',
                    'Comprehensive performance tracking and ROI analytics',
                    'Post-training support and reinforcement programs',
                  ]}
                  delay={0.1}
                  imagePosition="left"
                />

                <ServiceCard
                  title="Career Counseling"
                  description="Navigate your professional journey with confidence through personalized guidance from experienced career advisors who understand your industry."
                  icon={Target}
                  features={[
                    'In-depth career assessment and personalized planning',
                    'Professional resume writing and LinkedIn optimization',
                    'Mock interviews and presentation skills coaching',
                    'Industry insights and job market trend analysis',
                    'Networking strategies and professional connections',
                  ]}
                  delay={0.2}
                  imagePosition="right"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ServiceCard
                  title="Student Support"
                  description="Comprehensive support services ensuring you have everything you need to succeed throughout your educational journey with us."
                  icon={HeadphonesIcon}
                  features={[
                    '24/7 technical support and troubleshooting assistance',
                    'Dedicated student success coordinators',
                    'Extensive library of learning resources and study materials',
                    'Peer mentoring programs and study groups',
                    'Academic advising and progress monitoring',
                  ]}
                  delay={0.3}
                  imagePosition="left"
                />

                <ServiceCard
                  title="Professional Development"
                  description="Stay competitive in your field with continuous learning opportunities designed to keep your skills current and relevant."
                  icon={GraduationCap}
                  features={[
                    'Industry certification exam preparation and support',
                    'Specialized skill-building workshops and seminars',
                    'Leadership and management development programs',
                    'Continuing education credits and professional certifications',
                    'Access to exclusive industry events and conferences',
                  ]}
                  delay={0.4}
                  imagePosition="right"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <ServiceCard
                  title="Team Building & Collaboration"
                  description="Strengthen your team dynamics and improve collaboration through targeted programs that foster communication and trust."
                  icon={Users}
                  features={[
                    'Interactive team-building workshops and activities',
                    'Communication and conflict resolution training',
                    'Remote team collaboration best practices',
                    'Cross-functional team development programs',
                    'Leadership team alignment sessions',
                  ]}
                  delay={0.5}
                  imagePosition="left"
                />

                <ServiceCard
                  title="Certification Programs"
                  description="Earn recognized industry certifications that validate your expertise and enhance your professional credibility."
                  icon={Award}
                  features={[
                    'Comprehensive exam preparation courses',
                    'Practice tests and study materials',
                    'Expert instructors with certification experience',
                    'Flexible study schedules to fit your lifestyle',
                    'Certification maintenance and renewal support',
                  ]}
                  delay={0.6}
                  imagePosition="right"
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
