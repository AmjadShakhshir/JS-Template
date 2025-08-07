"use client";

import { useUser, useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { Shield, Check, X, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthTest() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          Clerk Auth Status
        </h3>
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>Loading authentication...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-600" />
        Clerk Auth Status
      </h3>
      
      <div className="space-y-4">
        {/* Authentication Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            {isSignedIn ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-800 font-medium">Authenticated</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4 text-red-600" />
                <span className="text-red-800 font-medium">Not Authenticated</span>
              </>
            )}
          </div>
          
          {isSignedIn ? (
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <LogIn className="w-4 h-4" />
                Sign In
              </button>
            </SignInButton>
          )}
        </div>

        {/* User Information */}
        {user && (
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Image
                src={user.imageUrl}
                alt={user.firstName || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <span className="text-gray-500">User ID:</span>
                <p className="font-mono text-xs bg-gray-100 p-1 rounded truncate">
                  {user.id}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <p className="text-gray-700">
                  {new Date(user.createdAt!).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
          <div className="flex gap-2">
            <Link
              href="/blog/admin"
              className="text-xs px-3 py-1 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
            >
              Admin Panel
            </Link>
            <Link
              href="/sign-in"
              className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
            >
              Sign In Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
