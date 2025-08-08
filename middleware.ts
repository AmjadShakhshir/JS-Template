import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/blog/admin(.*)',
]);

const isWebhookRoute = createRouteMatcher([
  '/api/webhooks(.*)',
]);

const isStaticExport = process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true';

export default clerkMiddleware(async (auth, req) => {
  // Skip middleware for static exports
  if (isStaticExport) {
    return NextResponse.next();
  }

  // Allow webhooks to pass through without auth
  if (isWebhookRoute(req)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      // Redirect to sign-in if not authenticated
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes (only when not static export)
    '/(api|trpc)(.*)',
  ],
};
