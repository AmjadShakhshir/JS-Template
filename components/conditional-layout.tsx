"use client";

import Navbar from "@/components/navbar";
import Header from "@/components/header";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Header />
      {children}
    </>
  );
}
