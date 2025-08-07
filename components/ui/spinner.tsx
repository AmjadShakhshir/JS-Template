"use client"

import { motion } from "framer-motion";

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerMode = 'inline' | 'overlay' | 'fullpage';

export interface SpinnerProps {
  size?: SpinnerSize;
  text?: string;
  mode?: SpinnerMode;
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 border-2',
  md: 'w-8 h-8 border-2', 
  lg: 'w-12 h-12 border-4'
};

const layoutClasses = {
  inline: 'flex items-center justify-center py-8',
  overlay: 'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
  fullpage: 'min-h-screen flex items-center justify-center'
};

export const Spinner = ({ 
  size = 'md', 
  text = "Loading...", 
  mode = 'inline',
  className = ""
}: SpinnerProps) => {
  const containerClass = `${layoutClasses[mode]} ${className}`;

  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative" role="status" aria-label={text}>
          <div className={`${sizeClasses[size]} border-primary/20 rounded-full animate-spin`}>
            <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
          </div>
        </div>
        <p className="text-white/70 text-sm animate-pulse" aria-live="polite">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export const FullPageSpinner = ({ text = "Loading Amazing Content" }: { text?: string }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.h2
          className="text-xl font-semibold text-white mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {text}
        </motion.h2>
        <p className="text-gray-400">Please wait while we prepare your experience...</p>
      </motion.div>
    </div>
  );
};
