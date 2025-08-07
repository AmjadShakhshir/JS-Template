"use client"

import { Skeleton } from "@/components/ui/skeleton";

export const ServiceCardSkeleton = () => (
  <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
    <Skeleton variant="circular" width="48px" height="48px" className="mb-4" />
    <Skeleton variant="text" width="70%" className="mb-2" />
    <Skeleton variant="text" lines={3} />
  </div>
);
