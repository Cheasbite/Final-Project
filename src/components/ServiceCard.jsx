
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Check } from 'lucide-react';

const ServiceCard = ({ title, description, features, icon: Icon, delay = 0, imagePosition = 'left' }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: imagePosition === 'left' ? -30 : 30 }}
      transition={{ duration: 0.6, delay }}
      className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-6">
        {Icon && (
          <div className="p-4 bg-primary/10 rounded-xl shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
      
      {features && features.length > 0 && (
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ServiceCard;
