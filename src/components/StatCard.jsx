
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const StatCard = ({ number, label, icon: Icon, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="p-3 bg-primary/10 rounded-xl">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        )}
        <div>
          <div className="text-3xl font-bold text-foreground stat-number mb-1">
            {number}
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
