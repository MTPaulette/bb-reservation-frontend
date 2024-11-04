import { useLocale, useTranslations } from 'next-intl';
import React from "react";
import { routing } from '@/i18n/routing';
import { Select, SelectItem } from '@nextui-org/react';
import { useParams } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

export default function LocalSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const [value, setValue] = React.useState<string>(locale);

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        { pathname, params },
        { locale: nextLocale }
      )
    });
    setValue(nextLocale);
  }

  return (
    <Select
      selectedKeys={[value]}
      defaultSelectedKeys={[value]}
      size="sm"
      disabled={isPending}
      onChange={onSelectChange}
      className="w-36 bg-background rounded-small" radius="sm"
    >
      {
        routing.locales.map((cur) => (
          <SelectItem key={cur}>
            {t("locale", {locale: cur})}
          </SelectItem>
        ))
      }
    </Select>
  );
}