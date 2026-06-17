
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Target, Eye, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const AboutPage = () => {
  const [missionRef, missionVisible] = useIntersectionObserver();
  const [valuesRef, valuesVisible] = useIntersectionObserver();

  return (
    <>
      <Helmet>
        <title>About Us - The American International Institute USA</title>
        <meta name="description" content="Learn about The American International Institute USA's mission to provide world-class professional education and career development opportunities." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl font-bold text-foreground mb-6">
                About The American International Institute USA
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Empowering professionals worldwide through innovative education and comprehensive career development since 2011
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2011, The American International Institute USA began with a simple yet powerful vision: to make high-quality professional education accessible to ambitious individuals worldwide.
                  </p>
                  <p>
                    What started as a small team of dedicated educators has grown into a global institution serving over 15,000 students across 47 countries. Our commitment to excellence and innovation has remained constant throughout our journey.
                  </p>
                  <p>
                    Today, we partner with leading corporations and industry experts to deliver cutting-edge programs that prepare professionals for the challenges of tomorrow's workplace.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 gap-6"
              >
                <div className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2 stat-number">15+</div>
                  <div className="text-sm font-medium text-muted-foreground">Years of Excellence</div>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2 stat-number">15,000+</div>
                  <div className="text-sm font-medium text-muted-foreground">Students Served</div>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2 stat-number">47</div>
                  <div className="text-sm font-medium text-muted-foreground">Countries Reached</div>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-bold text-primary mb-2 stat-number">200+</div>
                  <div className="text-sm font-medium text-muted-foreground">Industry Partners</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={missionRef} className="py-20 lg:py-32 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={missionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accessible, high-quality professional education that empowers individuals to achieve their career goals and organizations to build skilled, competitive workforces. We are committed to fostering lifelong learning and professional growth through innovative programs and personalized support.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={missionVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in professional education, recognized for our commitment to excellence, innovation, and student success. We envision a world where every professional has access to the education and resources they need to thrive in their chosen field.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={valuesRef} className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from curriculum design to student support.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Student-Centered</h3>
                <p className="text-muted-foreground">
                  Your success is our priority. We provide personalized support and resources to help you achieve your goals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously evolve our programs and methods to stay ahead of industry trends and best practices.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="p-4 bg-primary/10 rounded-xl w-fit mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with transparency, honesty, and ethical practices in all our interactions and decisions.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
