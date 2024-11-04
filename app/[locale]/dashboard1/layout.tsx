import AdminLayout from "@/components/layout/AdminLayout";
import BaseLayout from "@/components/layout/BaseLayout";
import { routing } from "@/i18n/routing";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <AdminLayout>
        {children}
      </AdminLayout>
    </BaseLayout>
  );
}