
import NotFoundPage from '@/components/NotFoundPage';
import BaseLayout from '@/components/layout/BaseLayout';
import { routing } from "@/i18n/routing";

export default function GlobalNotFoundPage() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <main className="flex h-screen w-screen flex-col items-center justify-center p-6 bg-red-300">
        <NotFoundPage />
      </main>
    </BaseLayout>
  );
}
