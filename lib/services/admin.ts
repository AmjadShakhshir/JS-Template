import { deploymentConfig } from './deployment';

/**
 * Admin authentication service with environment-aware implementation
 */

export interface AdminCheckResult {
  isAdmin: boolean;
  message: string;
}

type ClerkUser = {
  primaryEmailAddress?: { emailAddress: string } | null;
  emailAddresses?: { emailAddress: string }[];
};

/**
 * Client-side admin check using Clerk user data
 */
export function checkAdminClientSide(user: ClerkUser | null | undefined): AdminCheckResult {
  if (!user) {
    return { isAdmin: false, message: 'User not authenticated' };
  }

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const userEmail = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;

  const isAdmin = userEmail === adminEmail;
  
  return {
    isAdmin,
    message: isAdmin ? 'Admin access granted' : 'Admin access denied'
  };
}

/**
 * Server-side admin check (for API routes)
 */
export async function checkAdminServerSide(): Promise<AdminCheckResult> {
  // This will only be called in server contexts with API routes available
  try {
    const response = await fetch('/api/admin/check');
    const data = await response.json();
    return data;
  } catch {
    return { isAdmin: false, message: 'Authentication check failed' };
  }
}

/**
 * Environment-aware admin check
 */
export async function checkAdminStatus(user?: ClerkUser | null): Promise<AdminCheckResult> {
  if (deploymentConfig.isClient) {
    // Client-side: use Clerk user data directly
    return checkAdminClientSide(user);
  } else if (deploymentConfig.canUseApiRoutes) {
    // Server-side with API routes available
    return checkAdminServerSide();
  } else {
    // Static export: use client-side logic
    return checkAdminClientSide(user);
  }
}
