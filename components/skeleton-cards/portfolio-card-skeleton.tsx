"use client"

import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioCardSkeleton = () => (
  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
    <Skeleton variant="rectangular" height="200px" className="mb-4" />
    <Skeleton variant="text" width="80%" className="mb-2" />
    <Skeleton variant="text" lines={3} className="mb-4" />
    <div className="flex gap-2 mb-4">
      <Skeleton variant="rectangular" width="60px" height="24px" />
      <Skeleton variant="rectangular" width="50px" height="24px" />
    </div>
    <div className="flex gap-3">
      <Skeleton variant="rectangular" width="100px" height="36px" />
      <Skeleton variant="rectangular" width="80px" height="36px" />
    </div>
  </div>
);
