import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/pathnames': {
      en: '/pathnames',
      fr: '/pathnames',
    }
  }
})

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);