'use client';

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Footer from "@/app/components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Sidebar />
      <div className="px-4 md:ml-52 xl:ml-64 pt-4 bg-content2">
        {children}
        <Footer />
      </div>
    </SessionProvider>
  );
}