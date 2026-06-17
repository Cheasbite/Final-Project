
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgramCard from '@/components/ProgramCard';

const ProgramsPage = () => {
  const programs = [
    {
      title: 'Business Administration',
      description: 'Comprehensive program covering management principles, strategic planning, and organizational leadership.',
      duration: '12 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Digital Marketing',
      description: 'Master modern marketing strategies including SEO, social media, content marketing, and analytics.',
      duration: '8 weeks',
      level: 'Beginner',
    },
    {
      title: 'Data Science & Analytics',
      description: 'Learn data analysis, visualization, machine learning, and statistical modeling techniques.',
      duration: '16 weeks',
      level: 'Advanced',
    },
    {
      title: 'Project Management',
      description: 'Develop skills in project planning, execution, risk management, and team leadership.',
      duration: '10 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Human Resources Management',
      description: 'Explore talent acquisition, employee relations, performance management, and HR strategy.',
      duration: '12 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Financial Planning',
      description: 'Understand investment strategies, retirement planning, tax optimization, and wealth management.',
      duration: '14 weeks',
      level: 'Advanced',
    },
    {
      title: 'Supply Chain Management',
      description: 'Learn logistics, inventory management, procurement, and supply chain optimization.',
      duration: '10 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Build knowledge in network security, threat detection, risk assessment, and security protocols.',
      duration: '12 weeks',
      level: 'Beginner',
    },
    {
      title: 'Leadership Development',
      description: 'Enhance your leadership skills, emotional intelligence, and team management capabilities.',
      duration: '8 weeks',
      level: 'All Levels',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Programs - The American International Institute USA</title>
        <meta name="description" content="Explore our comprehensive range of professional development programs designed to advance your career and skills." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Our Programs
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Choose from our diverse range of professional development programs designed to help you achieve your career goals
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <ProgramCard
                  key={index}
                  title={program.title}
                  description={program.description}
                  duration={program.duration}
                  level={program.level}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ProgramsPage;
