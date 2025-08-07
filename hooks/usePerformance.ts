"use client"

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  label: 'web-vital' | 'custom';
  startTime: number;
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const pathname = usePathname();

  const reportWebVitals = useCallback((metric: WebVitalsMetric) => {
    if (process.env.NODE_ENV === 'production') {
      // You can send this to your analytics service
      console.log('Web Vitals:', metric);
    }
  }, []);

  useEffect(() => {
    // Monitor route changes
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const navigationTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`Route ${pathname} loaded in ${navigationTime.toFixed(2)}ms`);
      }
    };
  }, [pathname]);

  // Preload critical routes
  useEffect(() => {
    const criticalRoutes = ['/portfolio', '/about-me', '/services', '/contact'];
    
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (callback: () => void) => void }).requestIdleCallback(() => {
        criticalRoutes.forEach(route => {
          if (route !== pathname) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = route;
            document.head.appendChild(link);
          }
        });
      });
    }
  }, [pathname]);

  return { reportWebVitals };
}

// Image preloader utility
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Batch image preloader
export function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}
