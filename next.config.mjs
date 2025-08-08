/** @type {import('next').NextConfig} */
const isStaticExport = process.env.DEPLOYMENT_TARGET === 'static';

const nextConfig = {
  // Conditional static export
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
  }),
  
  // Disable server features for static export
  images: {
    // Disable image optimization for static export
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@tsparticles/react'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_DEPLOYMENT_TARGET: process.env.DEPLOYMENT_TARGET || 'server',
    NEXT_PUBLIC_IS_STATIC_EXPORT: isStaticExport ? 'true' : 'false',
  },
  
  // Ensure proper WebSocket handling for HMR and optimize bundle
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    // Optimize bundle splitting
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
