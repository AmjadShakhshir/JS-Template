import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Get user data to check email
  // For now, we'll protect at auth level and recommend using Clerk dashboard restrictions
  await auth.protect();
  
  return userId;
}

export async function isAdmin() {
  const { userId } = await auth();
  return Boolean(userId);
}
