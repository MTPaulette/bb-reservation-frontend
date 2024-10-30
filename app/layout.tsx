import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/fullcalendar-style.css";
// import { geistSans, geistMono } from "@/styles/fonts";
import { ubuntu } from "@/styles/fonts";

import {Provider} from "@/utils/Provider"

export const metadata: Metadata = {
  title: "BB-RESERVATION",
  description: "Systeme de reservation de Brain-Booster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      {/* <body className={`${fredoka.className} antialiased`}> */}
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
      <body className={`${ubuntu.variable} antialiased`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
