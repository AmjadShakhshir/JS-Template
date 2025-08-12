import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google"; // Temporarily disabled due to network timeout
import Script from "next/script";

import "./globals.css";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ConditionalLayout from "@/components/conditional-layout";
import { ToastProvider } from "@/components/toast-provider";

// Temporarily using system font fallback instead of Google Font
// const inter = Inter({ 
//   subsets: ["latin"],
//   display: "swap",
//   preload: true,
// });

export const metadata: Metadata = {
  title: "Amjad Shakhshir - Full Stack Developer",
  description: "Personal portfolio of Amjad Shakhshir - Full Stack Developer specializing in React, Node.js, and modern web technologies",
  keywords: "Amjad Shakhshir, Full Stack Developer, React, Node.js, Web Development, Portfolio",
  authors: [{ name: "Amjad Shakhshir" }],
  openGraph: {
    title: "Amjad Shakhshir - Full Stack Developer",
    description: "Personal portfolio showcasing modern web development projects and skills",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-inter">
        <ToastProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ToastProvider>
        
        {/* Performance monitoring script */}
        <Script
          id="performance-observer"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                      console.log('Page Load Time:', entry.loadEventEnd - entry.loadEventStart);
                    }
                  });
                });
                observer.observe({ entryTypes: ['navigation'] });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
