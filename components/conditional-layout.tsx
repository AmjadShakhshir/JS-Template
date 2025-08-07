"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide navbar and header on admin routes and auth pages
  const hideLayout = pathname.startsWith('/blog/admin') || 
                     pathname.startsWith('/sign-in') || 
                     pathname.startsWith('/sign-up');

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <Header />
      {children}
    </>
  );
}
