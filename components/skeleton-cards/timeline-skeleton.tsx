"use client"

import { Skeleton } from "@/components/ui/skeleton";

export const TimelineItemSkeleton = () => (
  <div className="relative pl-20">
    <div className="absolute left-6 w-5 h-5 rounded-full bg-gray-600"></div>
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
      <Skeleton variant="text" width="70%" className="mb-4" />
      <Skeleton variant="text" lines={2} className="mb-4" />
      <div className="flex gap-2">
        <Skeleton variant="rectangular" width="60px" height="24px" />
        <Skeleton variant="rectangular" width="50px" height="24px" />
      </div>
    </div>
  </div>
);
