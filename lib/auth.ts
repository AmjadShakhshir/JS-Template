import { auth, currentUser } from "@clerk/nextjs/server";

export async function checkIsAdmin() {
  const { userId } = await auth();
  
  if (!userId) {
    return false;
  }

  const user = await currentUser();
  
  if (!user) {
    return false;
  }

  // Check if user email matches admin email from environment
  const adminEmail = process.env.ADMIN_EMAIL;
  const userEmail = user.primaryEmailAddress?.emailAddress;

  return userEmail === adminEmail;
}

export async function requireAdmin() {
  const isAdmin = await checkIsAdmin();
  
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
  
  return true;
}
