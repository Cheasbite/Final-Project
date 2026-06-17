
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ProgramCard = ({ title, description, duration, level, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">{description}</p>
        
        <div className="flex gap-2 mb-6">
          {duration && (
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg">
              {duration}
            </span>
          )}
          {level && (
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-lg">
              {level}
            </span>
          )}
        </div>
      </div>
      
      <Button className="w-full mt-auto group">
        Enroll Now
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default ProgramCard;
