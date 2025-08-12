# GitHub Copilot Instructions

## Project Overview
Modern Next.js 15 portfolio website with full-stack capabilities, featuring a blog CMS, authentication, and comprehensive fallback systems. The project emphasizes type safety, performance optimization, and graceful degradation.

## Architecture & Key Patterns

### Hybrid Data Strategy
The project uses a **database-first approach with localStorage fallback** pattern:
```ts
// lib/database.ts - Automatic fallback wrapper
const withFallback = async <T>(
  databaseOperation: () => Promise<T>,
  fallbackOperation: () => T
): Promise<T> => { /* ... */ }
```
- **Primary**: Supabase PostgreSQL with Row Level Security (RLS)
- **Fallback**: localStorage with identical API surface
- **Key files**: `lib/database.ts`, `lib/blog-storage.ts`, `lib/supabase/queries/`

### Authentication Architecture
**Admin-only system** with multiple protection layers:
- **Middleware**: `middleware.ts` protects `/blog/admin(.*)` routes
- **Environment-driven admin**: `ADMIN_EMAIL` controls all access
- **Webhook blocking**: Automatically deletes non-admin registrations
- **UI protection**: Conditional layouts hide admin features from public users

### Component Organization Patterns
- **Conditional rendering**: `components/conditional-layout.tsx` handles auth/admin layout switching
- **Variant-based components**: Blog cards use `variant` prop (`default`, `featured`, `compact`)
- **Client-side hydration safety**: Components use `isClient` state for SSR/client consistency
- **Glass morphism**: Consistent `glass-morphism` CSS class across components

## Development Workflows

### Essential Commands
```bash
npm run dev              # Development with hostname localhost:3000
npm run build            # Production build
npm run lint             # ESLint check
```

### Database Setup Workflow
1. **Development**: Works without database (localStorage fallback)
2. **Production setup**: Run `lib/supabase/migrations/schema.sql` in Supabase
3. **Testing**: Visit `/blog/admin` to verify database connection
4. **Fallback verification**: Remove env vars to test localStorage mode

### Authentication Testing
- **Admin access**: Sign in with `ADMIN_EMAIL` at `/sign-in`
- **Protection test**: Access `/blog/admin` without auth (should redirect)
- **Webhook test**: Try registering with different email (should auto-delete)

## Code Conventions

### TypeScript Patterns
- **Branded types preferred**: Use `type UserId = Brand<string, 'UserId'>` pattern
- **Type-only imports**: Always use `import type { ... }` for types
- **Database typing**: All DB helpers typed as `KyselyDatabase | Transaction<Database>`

### Component Patterns
- **Motion components**: Framer Motion with `isClient` checks for hydration safety
- **Error boundaries**: Image components have `onError` fallbacks
- **Flexible variants**: Use union types for component variations (`"default" | "featured" | "compact"`)

### Data Patterns
- **Blog posts**: Transform Supabase format to legacy format for consistency
- **Categories**: Color-coded with `blogCategories` mapping
- **Featured content**: Boolean flags with special UI treatment
- **Fallback images**: Always provide `onError` handlers for external images

## Environment Configuration

### Required Variables
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_*
CLERK_SECRET_KEY=sk_*
CLERK_WEBHOOK_SECRET=whsec_*
ADMIN_EMAIL=admin@email.com

# Supabase (optional - graceful fallback)
NEXT_PUBLIC_SUPABASE_URL=https://*.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ*
```

### Environment Checks
The app gracefully degrades without Supabase credentials - use `isDatabaseAvailable()` pattern for feature detection.

## Performance & UX Patterns

### Animation System
- **Framer Motion**: Consistent `slideIn`, `staggerContainer` utilities
- **Delay patterns**: Staggered animations with `index * 0.1` delays
- **Hydration-safe**: All animations wrapped in `isClient` checks

### Image Optimization
- **Next.js Image**: Used everywhere with error fallbacks
- **External domains**: Configure in `next.config.mjs` (currently: Unsplash, Clerk)
- **Loading states**: Skeleton components in `components/skeleton-cards/`

### Error Handling
- **Database errors**: Automatic fallback to localStorage
- **Image errors**: Default fallback images for broken URLs
- **Auth errors**: Clean redirects and user messaging

## Key Integration Points

### Blog System
- **Admin panel**: Full CRUD at `/blog/admin` (auth required)
- **Public blog**: Filtered/sorted content at `/blog`
- **Individual posts**: Dynamic routing at `/blog/[slug]`
- **Search & filtering**: Client-side with URL params

### Contact System  
- **Forms**: Submit to Supabase or localStorage
- **Validation**: Client and server-side validation
- **Admin view**: Protected contact submissions list

### Portfolio Features
- **Interactive demos**: `/demo-features` showcases all portfolio capabilities
- **Code playground**: `/code-playground` with syntax highlighting
- **Performance monitoring**: Built-in performance observers

## Testing Approach
- **No test runner**: Follow best practices without automated testing (as per `CLAUDE.md`)
- **Manual testing workflows**: Use `/demo-features` for comprehensive feature testing
- **Database fallback testing**: Remove env vars to verify localStorage mode
- **Auth flow testing**: Multiple user scenarios in admin system

## Common Gotchas
- **Hydration mismatches**: Always use `isClient` for dynamic content
- **Database availability**: Check environment before Supabase operations
- **Image domains**: Add new external domains to `next.config.mjs`
- **Admin routes**: All admin functionality requires authentication middleware
- **RLS policies**: Database policies depend on `ADMIN_EMAIL` environment variable
- **Environment files**: Never read or access `.env` files directly - use documented patterns and configuration requirements instead
