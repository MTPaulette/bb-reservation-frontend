"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="relative max-w-full overflow-hidden bg-content2 text-foreground">
      <Navbar />
      <main className="min-h-screen px-6 py-10 sm:p-12 sm:pt-16 bg-content2">
        {children}
      </main>
      <Footer />
    </div>
  );
}
