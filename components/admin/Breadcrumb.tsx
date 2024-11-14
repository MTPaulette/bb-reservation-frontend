import Link from "next/link";
import Title from "@/components/Title";
import { useLocale, useTranslations } from 'next-intl';
import { capitalize } from "@/lib/utils";

interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const t = useTranslations("Breadcrumb");
  const locale = useLocale();

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Title className="text-2xl">
        {capitalize(t(pageName))}
      </Title>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-foreground/50" href={`/${locale}`}>
              { capitalize(t("dashboard")) } /
            </Link>
          </li>
          <li className="font-medium text-foreground"> {capitalize(t(pageName))}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
