
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { Users, BookOpen, TrendingUp, Award, Briefcase, Headphones as HeadphonesIcon, GraduationCap, Target, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>The American International Institute USA - Professional Education Platform</title>
        <meta name="description" content="Advance your professional journey with The American International Institute USA. Access 50+ programs, expert career counseling, and comprehensive student support." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 lg:py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Open-Education Platform</span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Advance Your{' '}
                  <span className="text-primary">Professional Journey</span>
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                  Join thousands of professionals worldwide who are transforming their careers through our comprehensive education programs and expert guidance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Button asChild size="lg" className="text-base">
                    <Link to="/programs">Explore Programs</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-base">
                    <Link to="/contact">Get Started Today</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <StatCard number="5,000+" label="Active Students" icon={Users} delay={0.1} />
                  <StatCard number="50+" label="Programs" icon={BookOpen} delay={0.2} />
                  <StatCard number="95%" label="Success Rate" icon={TrendingUp} delay={0.3} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://horizons-cdn.hostinger.com/68534476-4feb-4c87-8420-265fd26a6cf1/d4912762d745aa9ec54f874f2825cdb2.png"
                    alt="Professional library with students studying"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-foreground">California, USA</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive support designed to help you achieve your professional goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ServiceCard
                title="Corporate Training"
                description="Customized training programs designed to upskill your workforce and drive organizational success."
                icon={Briefcase}
                features={[
                  'Industry-specific curriculum development',
                  'Expert instructors with real-world experience',
                  'Flexible scheduling and delivery formats',
                  'Performance tracking and analytics',
                ]}
                delay={0.1}
                imagePosition="left"
              />

              <ServiceCard
                title="Career Counseling"
                description="One-on-one guidance from experienced career advisors to help you navigate your professional path."
                icon={Target}
                features={[
                  'Personalized career assessment and planning',
                  'Resume and interview preparation',
                  'Industry insights and job market trends',
                  'Networking opportunities and connections',
                ]}
                delay={0.2}
                imagePosition="right"
              />

              <ServiceCard
                title="Student Support"
                description="Comprehensive support services to ensure your success throughout your educational journey."
                icon={HeadphonesIcon}
                features={[
                  '24/7 technical and academic assistance',
                  'Dedicated student success coordinators',
                  'Learning resources and study materials',
                  'Peer mentoring and study groups',
                ]}
                delay={0.3}
                imagePosition="left"
              />

              <ServiceCard
                title="Professional Development"
                description="Continuous learning opportunities to keep your skills current and competitive in the job market."
                icon={GraduationCap}
                features={[
                  'Industry certification preparation',
                  'Skill-building workshops and seminars',
                  'Leadership development programs',
                  'Continuing education credits',
                ]}
                delay={0.4}
                imagePosition="right"
              />
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-[#1e40af] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                Real results from real students across the globe
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <Globe className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <div className="text-5xl font-bold mb-2 stat-number">15,000+</div>
                <div className="text-blue-100 font-medium">Students Worldwide</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <Award className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <div className="text-5xl font-bold mb-2 stat-number">95%</div>
                <div className="text-blue-100 font-medium">Success Rate</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <Briefcase className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <div className="text-5xl font-bold mb-2 stat-number">200+</div>
                <div className="text-blue-100 font-medium">Industry Partners</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <Zap className="w-12 h-12 mx-auto mb-4 text-blue-200" />
                <div className="text-5xl font-bold mb-2 stat-number">15+</div>
                <div className="text-blue-100 font-medium">Years of Excellence</div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">What Our Students Say</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from professionals who have transformed their careers with our programs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                text="The corporate training program completely transformed how our team approaches project management. The instructors were knowledgeable and the content was immediately applicable to our work."
                author="Maya Chen"
                role="Project Manager, Tech Solutions Inc."
                delay={0.1}
              />
              <TestimonialCard
                text="Career counseling helped me identify my strengths and navigate a successful transition into data science. The personalized guidance was invaluable during my job search."
                author="Raj Patel"
                role="Data Scientist, Analytics Corp"
                delay={0.2}
              />
              <TestimonialCard
                text="The student support team was there every step of the way. From technical issues to study strategies, they made sure I had everything I needed to succeed in my certification program."
                author="Lucia Torres"
                role="Certified Professional, Healthcare Industry"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join thousands of professionals who are advancing their careers with our comprehensive education programs and expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-base bg-white text-blue-900 hover:bg-blue-50">
                <Link to="/programs">Browse Programs</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base border-white text-white hover:bg-white/10">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
