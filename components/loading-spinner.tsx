"use client"

import { Spinner, FullPageSpinner } from "@/components/ui/spinner";
import { SkeletonCard } from "@/components/skeleton-cards";
import type { SpinnerSize } from "@/components/ui/spinner";
import type { SkeletonVariant } from "@/components/skeleton-cards";

// Legacy types and interfaces for backward compatibility
type LoadingMode = 'spinner' | 'skeleton' | 'fullpage' | 'overlay' | 'inline';

type LoadingProps = {
  mode?: LoadingMode;
  text?: string;
  size?: SpinnerSize;
  skeleton?: {
    variant: SkeletonVariant;
    count?: number;
    lines?: number;
  };
};

const LoadingSpinner = ({ 
  mode = 'spinner',
  text = "Loading...", 
  size = 'md',
  skeleton
}: LoadingProps) => {
  // Skeleton Mode
  if (mode === 'skeleton' && skeleton?.variant) {
    return (
      <div className="space-y-4">
        <SkeletonCard 
          variant={skeleton.variant} 
          count={skeleton.count}
          lines={skeleton.lines}
        />
      </div>
    );
  }

  // Fullpage Mode
  if (mode === 'fullpage') {
    return <FullPageSpinner text={text} />;
  }

  // Default to inline spinner for all other modes
  return <Spinner size={size} text={text} mode={mode === 'overlay' ? 'overlay' : 'inline'} />;
};

export default LoadingSpinner;

// Export skeleton components for backward compatibility
export { 
  PortfolioCardSkeleton, 
  ServiceCardSkeleton, 
  ProfileSkeleton, 
  TimelineItemSkeleton 
} from "@/components/skeleton-cards";

export const FullPageLoader = () => <FullPageSpinner text="Loading Amazing Content" />;
