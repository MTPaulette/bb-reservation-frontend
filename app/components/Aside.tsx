'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function Aside() {
  const pathname = usePathname();

  return (
    <>
    <div className="fixed bottom-0 z-10 flex flex-col items-center justify-center h-16 w-screen md:left-0 md:h-screen md:w-16 md:py-6 bg-secondary text-[10px] font-semibold">
      <ul className="flex over-x over-y items-center justify-around md:space-y-2 h-16 w-full md:left-0 md:flex-col md:justify-start md:h-full md:w-16">
      
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('flex flex-col justify-center items-center min-w-[64px] capitalize hover:text-accentuate',
                {
                  'text-accentuate': pathname === link.href,
                },
              )}
            >
              <span className={clsx('px-2 py-1 rounded', {'bg-highlight': pathname === link.href, },)}>
                <LinkIcon className="w-5 h-5" />
              </span>
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </ul>
    </div>
    </>
  );
}
