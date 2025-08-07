"use client"

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

const DefaultFallback = () => (
  <motion.div 
    className="flex items-center justify-center py-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-6 h-6 border-2 border-primary/30 rounded-full animate-spin">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </motion.div>
);

// Lazy load the particles component
export const LazyParticles = lazy(() => 
  import("@/components/cover-particles").then(mod => ({ 
    default: mod.CoverParticles 
  }))
);

// Wrapper component for lazy particles
export const ParticlesWrapper = () => (
  <Suspense fallback={<DefaultFallback />}>
    <LazyParticles />
  </Suspense>
);
