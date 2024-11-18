import Footer from "@/components/admin/Footer";
import { BbLogo } from "@/components/BbLogo";
import BaseLayout from '@/components/layout/BaseLayout';
import { routing } from "@/i18n/routing";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      {/* <main className="flex items-center justify-center h-screen bg-gradient-to-t to-background from-success/60 via-success/10 dark:from-success/20"> */}
      <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-t
       from-success via-success/30 via-success/20 via-success/5 
      dark:from-[#262262] dark:via-[#262262]/30 dark:via-[#262262]/20 dark:via-[#262262]/5 
      to-transparent">
      {/* <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-t from-success via-success/30 via-success/20 via-success/5 to-transparent"> */}
      <div className="h-full max-w-[400px] flex flex-col items-center justify-center">
        <div className="relative mx-auto flex flex-col space-y-2.5 pt-4 md:-mt-32">
          <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <BbLogo />
            </div>
          </div>
          {children}
        </div>
        <div className="mt-6 w-full">
          <Footer/>
        </div>
        </div>
      </main>
    </BaseLayout>
  );
}
