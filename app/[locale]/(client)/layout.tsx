
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BaseLayout from '@/components/layout/BaseLayout';
import { routing } from "@/i18n/routing";

export default function ReservationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
    <div className="relative max-w-full overflow-hidden">
      <Navbar />
      <main className="min-h-screen px-6 py-10 sm:p-12 sm:pt-16 bg-content2">
        {children}
      </main>
      <Footer />
    </div>
    </BaseLayout>
  );
}
