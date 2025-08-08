"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Check, X, User } from "lucide-react";
import Image from "next/image";
import { checkAdminClientSide, type AdminCheckResult } from "@/lib/services/admin";

export default function AuthStatus() {
  const { user, isLoaded } = useUser();
  const [adminStatus, setAdminStatus] = useState<AdminCheckResult | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      // Use client-side admin check for static deployments
      const status = checkAdminClientSide(user);
      setAdminStatus(status);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-2 text-gray-500">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-2 text-gray-600">
        <User className="w-4 h-4" />
        <span>Not signed in</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Image
          src={user.imageUrl}
          alt={user.firstName || "User"}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm text-gray-700">
          {user.firstName} {user.lastName}
        </span>
      </div>
      
      {adminStatus && (
        <div
          className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs ${
            adminStatus.isAdmin
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {adminStatus.isAdmin ? (
            <>
              <Check className="w-3 h-3" />
              <span>Admin</span>
            </>
          ) : (
            <>
              <X className="w-3 h-3" />
              <span>User</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
