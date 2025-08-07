"use client"

import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => (
  <div className="flex items-center gap-4">
    <Skeleton variant="avatar" />
    <div className="flex-1">
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="40%" />
    </div>
  </div>
);
