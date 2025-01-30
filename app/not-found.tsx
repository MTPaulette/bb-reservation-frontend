
import NotFoundPage from '@/components/NotFound';
import BaseLayout from '@/components/layout/BaseLayout';
import { routing } from "@/i18n/routing";

export default function GlobalNotFoundPage() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <main className="flex h-screen w-screen flex-col items-center justify-center p-6">
        <NotFoundPage title="page_not_found" />
      </main>
    </BaseLayout>
  );
}
