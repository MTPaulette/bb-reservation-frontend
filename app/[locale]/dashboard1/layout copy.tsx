"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/dashboard1/Sidebar";
import Footer from "@/components/admin/Footer";
import Navbar from "@/components/dashboard1/Navbar";
import BaseLayout from "@/components/layout/BaseLayout";
import { routing } from "@/i18n/routing";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
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
    </BaseLayout>
  );
}