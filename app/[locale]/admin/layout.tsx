"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/globals.css";
import "@/styles/admin-style.css";
import "@/styles/satoshi.css";

import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="fr">
    <body>
      <div className="flex bg-content2 text-foreground">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col lg:ml-67">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          <Footer/>
        </div>
      </div>
    </body>
    </html>
  );
}

/*
"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";

import "@/css/satoshi.css";
import "@/css/style.css";

import React, { useEffect, useState } from "react";
import Loader from "@/components/dashboard/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
*/