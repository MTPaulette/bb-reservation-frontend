import Footer from "@/components/admin/Footer";
import { BbLogo } from "@/components/BbLogo";
import BaseLayout from '@/components/Layout/BaseLayout';
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { routing } from "@/i18n/routing";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>
      {/* <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-t from-success via-success/30 via-success/20 via-success/5 to-transparent"> */}
      <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-t overflow-x-hidden over-y
        from-success via-success/30 via-success/20 via-success/5 to-transparent
      dark:from-[#262262] dark:via-[#262262]/30 dark:via-[#262262]/20 dark:via-[#262262]/5"
      >
        <div className="h-full max-w-[400px] flex flex-col items-center justify-center">
          <div className="relative mx-auto flex flex-col space-y-2.5 pt-22">
            <BbLogo width={100} />
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
