"use client"

import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export default function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set');
    // Return children without Clerk provider for static builds without keys
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children}
    </ClerkProvider>
  );
}
