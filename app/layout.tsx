import type { Metadata } from "next";
import "@/app/styles/globals.css";
// import { geistSans, geistMono } from "@/app/styles/fonts";
import { ubuntu } from "@/app/styles/fonts";

import {Provider} from "@/app/utils/Provider"

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
