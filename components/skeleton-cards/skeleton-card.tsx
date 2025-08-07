"use client"

import { motion } from "framer-motion";
import { PortfolioCardSkeleton } from './portfolio-card-skeleton';
import { ServiceCardSkeleton } from './service-card-skeleton';
import { ProfileSkeleton } from './profile-skeleton';
import { TimelineItemSkeleton } from './timeline-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export type SkeletonVariant = 'text' | 'card' | 'profile' | 'timeline' | 'portfolio';

interface SkeletonCardProps {
  variant: SkeletonVariant;
  count?: number;
  lines?: number;
}

export const SkeletonCard = ({ variant, count = 1, lines }: SkeletonCardProps) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'portfolio':
        return <PortfolioCardSkeleton />;
      case 'card':
        return <ServiceCardSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      case 'timeline':
        return <TimelineItemSkeleton />;
      case 'text':
      default:
        return <Skeleton variant="text" lines={lines || 3} />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderSkeleton()}
        </motion.div>
      ))}
    </>
  );
};
