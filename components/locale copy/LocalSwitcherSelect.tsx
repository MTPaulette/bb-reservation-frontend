"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { ChevronDownIcon } from "../Icons";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
}

export default function LocalSwitcherSelect({
  children, defaultValue, label
}: Props) {
  
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <label
      className={clsx(
        "relative text-foreground",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none border-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      {/* <span className="pointer-events-none absolute right-2 top-[8px]"> */}
      <span className="pointer-events-none absolute right-1 top-[7px]">
        <ChevronDownIcon fill="current-color" size={10} />
      </span>
    </label>
  );
}



{/* 
import { useLocale, useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();

  const handleLanguageChange = (language: string) => {
    t('locale', {locale: language});
  };

  return (
    <div>
      <select value={locale} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
} */}