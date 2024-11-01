import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/fullcalendar-style.css";

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
    <body>
      <div className="bg-background text-foreground">
        <Provider>
          {children}
        </Provider>
      </div>
    </body>
    </html>
  );
}
