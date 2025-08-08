/**
 * Deployment environment detection and configuration
 */

export const isStaticExport = 
  process.env.NEXT_PUBLIC_IS_STATIC_EXPORT === 'true' ||
  process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET === 'static' ||
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));

export const canUseApiRoutes = !isStaticExport && typeof window === 'undefined';

export const isClient = typeof window !== 'undefined';
export const isServer = typeof window === 'undefined';

export const deploymentConfig = {
  isStaticExport,
  canUseApiRoutes,
  isClient,
  isServer,
  deploymentTarget: process.env.NEXT_PUBLIC_DEPLOYMENT_TARGET || 'server'
} as const;
