"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Check, X, User } from "lucide-react";
import Image from "next/image";

export default function AuthStatus() {
  const [adminStatus, setAdminStatus] = useState<{
    isAdmin: boolean;
    message: string;
  } | null>(null);
  const [clerkError, setClerkError] = useState(false);

  // Check if Clerk is properly configured
  useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
      setClerkError(true);
    }
  }, []);

  // If Clerk is not configured, show a fallback
  if (clerkError) {
    return (
      <div className="flex items-center space-x-2 text-orange-600">
        <X className="w-4 h-4" />
        <span>Auth not configured</span>
      </div>
    );
  }

  return <AuthStatusWithClerk adminStatus={adminStatus} setAdminStatus={setAdminStatus} />;
}

function AuthStatusWithClerk({ 
  adminStatus, 
  setAdminStatus 
}: {
  adminStatus: { isAdmin: boolean; message: string; } | null;
  setAdminStatus: (status: { isAdmin: boolean; message: string; } | null) => void;
}) {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => setAdminStatus(data))
        .catch(() => setAdminStatus({ isAdmin: false, message: "Error checking admin status" }));
    }
  }, [isLoaded, user, setAdminStatus]);

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
