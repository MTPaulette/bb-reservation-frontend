"use client";

import Link from "next/link";
import clsx from "clsx";

import { UserGroupIcon, HomeIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: DocumentDuplicateIcon,
  },
  { name: "Customers", href: "/dashboard/customers", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              // "flex grow-0 md:grow h-[48px] md:h-[36px] items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-content2 hover:bg-background hover:text-warning md:flex-none md:justify-start md:p-2 md:px-3",
              "flex groww-0 md:groww h-[48px] md:h-[36px] items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:no-underline hover:bg-content2 hover:text-warning md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "text-warning": pathname === link.href,
              },
            )}
            aria-current={pathname === link.href ? "page" : "false"}
          >
            <LinkIcon className="w-5" />
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
