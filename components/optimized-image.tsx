"use client"

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary/30 rounded-full animate-spin">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
          <p className="text-white/50 text-sm">Failed to load image</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
