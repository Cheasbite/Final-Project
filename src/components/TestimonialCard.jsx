
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ text, author, role, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
    >
      <Quote className="w-10 h-10 text-primary/20 mb-4" />
      <p className="text-foreground leading-relaxed mb-6 flex-grow">
        {text}
      </p>
      <div className="border-t border-border pt-4">
        <div className="font-semibold text-foreground">{author}</div>
        <div className="text-sm text-muted-foreground mt-1">{role}</div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
