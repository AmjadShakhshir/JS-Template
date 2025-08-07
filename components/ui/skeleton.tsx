"use client"

import { motion } from "framer-motion";

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'avatar';
  width?: string;
  height?: string;
  lines?: number;
}

export const Skeleton = ({ 
  className = "", 
  variant = "rectangular",
  width = "100%",
  height = "20px",
  lines = 1 
}: SkeletonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'text': return 'h-4 rounded';
      case 'circular': return 'rounded-full';
      case 'avatar': return 'rounded-full w-12 h-12';
      case 'rectangular':
      default: return 'rounded-lg';
    }
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <motion.div
            key={index}
            className={`bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] ${getVariantClasses()}`}
            style={{ 
              width: index === lines - 1 ? '75%' : width,
              height 
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: index * 0.1 }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-[length:200%_100%] ${getVariantClasses()} ${className}`}
      style={{ width, height }}
      animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  );
};
