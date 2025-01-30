import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/globals.css";
import "@/styles/admin-style.css";
import "@/styles/satoshi.css";

import React from "react";

import SessionProviderWrapper from "@/components/layout/SessionProviderWrapper";
import AdminLayout from "@/components/layout/AdminLayout";
import BaseLayout from "@/components/layout/BaseLayout";
import { routing } from "@/i18n/routing";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <SessionProviderWrapper>
        <AdminLayout>{children}</AdminLayout>
      </SessionProviderWrapper>
    </BaseLayout>
  );
}