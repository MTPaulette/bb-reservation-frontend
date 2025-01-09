import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/styles/globals.css";
import "@/styles/admin-style.css";
import "@/styles/satoshi.css";

import React from "react";

import SessionProviderWrapper from "@/components/Layout/SessionProviderWrapper";
import AdminLayout from "@/components/Layout/AdminLayout";
import BaseLayout from "@/components/Layout/BaseLayout";
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