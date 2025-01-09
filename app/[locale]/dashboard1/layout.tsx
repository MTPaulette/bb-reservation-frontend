import SessionProviderWrapper from "@/components/Layout/SessionProviderWrapper";
import BaseLayout from "@/components/Layout/BaseLayout";
import { routing } from "@/i18n/routing";
import Sidebar from "@/components/dashboard1/Sidebar";
import Footer from "@/components/admin/Footer";
import Navbar from "@/components/dashboard1/Navbar";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <SessionProviderWrapper>
        <Sidebar />
        <div className="md:ml-52 xl:ml-64 bg-content2">
          <Navbar />
          <main className="min-h-screen flex flex-col px-4 pt-6 md:pt-10">
            {children}
          </main>
          <Footer />
        </div>
      </SessionProviderWrapper>
    </BaseLayout>
  );
}