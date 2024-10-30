"use client";

import { Link, Divider } from "@nextui-org/react";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Terms & Conditions", href: "/terms"},
    { name: "Privacy Policy", href: "/policy"},
  ];


  return (
    <footer className="pb-3 text-foreground/60">
      <Divider className="my-2 lg:my-4" />
      {/* <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between"> */}
      <div className="sm:flex sm:items-center sm:justify-between px-4">
        <span className="sm:text-center text-small">
          © { new Date().getFullYear() } <span className="pointer-events-none">Brain-Booster™</span>. Tous droits réservés.
        </span>
        <ul className="flex mt-1 lg:mt-4 justify-end space-x-6 sm:justify-center sm:mt-0">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mb-2"
            >
              <Link
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                size="sm" aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
