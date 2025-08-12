# Webhook Alternatives for Admin-Only Access

The current webhook implementation automatically deletes non-admin users. Here are better alternatives:

## Option 1: Clerk Dashboard Settings (Recommended)

### Disable Public Registration
1. Go to Clerk Dashboard → Settings → Authentication
2. Under "Sign-up" → Disable "Allow users to sign up"
3. Use invitation-only mode or manual user creation

### Invite-Only Mode
1. Go to Settings → Authentication → Restrictions
2. Enable "Invitation only"
3. Manually invite admin users

## Option 2: Page-Level Protection (Current Implementation)

The admin pages now use client-side protection:

```typescript
const { user, isLoaded } = useUser();

useEffect(() => {
  if (isLoaded && (!user || user.emailAddresses[0]?.emailAddress !== process.env.NEXT_PUBLIC_ADMIN_EMAIL)) {
    redirect('/');
  }
}, [user, isLoaded]);
```

## Option 3: Server-Side Protection (More Secure)

Create a server component wrapper:

```typescript
// lib/auth-check.ts
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const { user } = await auth();
  
  if (!user || user.emailAddresses[0]?.emailAddress !== process.env.ADMIN_EMAIL) {
    redirect('/restricted');
  }
  
  return user;
}
```

Then use in admin pages:
```typescript
// app/blog/admin/page.tsx
import { requireAdmin } from '@/lib/auth-check';

export default async function AdminPage() {
  await requireAdmin();
  // ... rest of component
}
```

## Environment Variables

Make sure to use consistent variable names:

```env
# For server-side (webhooks, API routes, server components)
ADMIN_EMAIL=your-email@example.com

# For client-side (browser access)
NEXT_PUBLIC_ADMIN_EMAIL=your-email@example.com
```

## Recommendation

**Use Option 1 (Clerk Dashboard)** for the most secure approach, combined with **Option 3** for additional server-side protection on sensitive pages.

The current webhook can be removed once you implement dashboard restrictions.
