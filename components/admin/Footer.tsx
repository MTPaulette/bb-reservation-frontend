"use client";

import { Link, Divider } from "@nextui-org/react";

import { usePathname } from "next/navigation";
import LocalSwitcher from "./../LocalSwitcher";
import { useLocale, useTranslations } from "next-intl";


export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const pathname = usePathname();
  const menuItems = [
    { name: t("terms"), href: `${locale}/terms`},
    { name: t("privacy"), href: `${locale}/policy`},
  ];


  return (
    <footer className="pb-3 text-foreground/60 w-full">
      <Divider className="my-2 lg:my-4" />
      {/* <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between"> */}
      {/* <div className="sm:flex items-center justify-between px-4 mt-1 lg:mt-4 w-full"> */}
      <div className="flex flex-wrap items-center justify-between px-4 mt-1 lg:mt-4 w-full">
        <p className="sm:text-center text-small mb-3 md:mb-2 whitespace-nowrap">
          © { new Date().getFullYear() } <span className="pointer-events-none">Brain-Booster™</span>. {t("copyright")}.
        </p>
        <ul className="flex justify-end w-full md:w-auto space-x-6 md:justify-center">
          {menuItems.map((item, index) => (
            <li
              key={index}
            >
              <Link
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                size="sm" aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
            </li>
          ))}
          <li>
            <LocalSwitcher />
          </li>
        </ul>
      </div>
    </footer>
  );
}
