import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/fullcalendar-style.css";

import {Provider} from "@/utils/Provider"
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "BB-RESERVATION",
  description: "Systeme de reservation de Brain-Booster",
};

export default async function BaseLayout({
  children,
  locale
}: Readonly<{
  children: React.ReactNode; locale: string
}>) {

  if(!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
    <body>
      <div className="bg-background text-foreground">
        {/* <NextIntlClientProvider> */}
        <NextIntlClientProvider messages={messages}>
        <Provider>
          {children}
        </Provider>
        </NextIntlClientProvider>
      </div>
    </body>
    </html>
  );
}
