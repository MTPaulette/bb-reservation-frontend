'use client';

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Footer from "@/app/components/dashboard/Footer";
import Navbar from "@/app/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Sidebar />
      <div className="md:ml-52 xl:ml-64 bg-content2">
        <Navbar />
        <main className="min-h-screen flex flex-col px-4 pt-6 md:pt-10">
          {children}
        </main>
        <Footer />
      </div>
    </SessionProvider>
  );
}