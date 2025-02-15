"use client";

import { Link, Divider } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { FacebookIcon, InstagramIcon, LinkedlinIcon, TwitterIcon, WhatsappIcon, WorldIcon } from "@/components/Icons";

import { BbLogo } from "@/components/BbLogo";
import LocalSwitcher from "./LocalSwitcher";

export default function Footer() {
  const pathname = usePathname();

  const socialNetwork = [
    { name: "facebook", href: "#", icon: <FacebookIcon fill="currentColor" size={20} /> },
    { name: "instagram", href: "#", icon: <InstagramIcon fill="currentColor" size={20} /> },
    { name: "linkledin", href: "#", icon: <LinkedlinIcon fill="currentColor" size={20} /> },
    { name: "x", href: "#", icon: <TwitterIcon fill="currentColor" size={20} /> },
    { name: "whatsapp", href: "#", icon: <WhatsappIcon fill="currentColor" size={20} /> },
    { name: "web site", href: "#", icon: <WorldIcon fill="currentColor" size={20} /> },
  ];

  const menuItems = [
    { title: "Entreprise", items: [
      { name: "Compte", href: "/account"},
      { name: "Calendrier des reservations", href: "/calendar"},
      { name: "Contact", href: "/contact"},
    ]},

    { title: "Explorer", items: [
      { name: "Articles", href: "/products"},
      { name: "Evènement", href: "/event"},
      { name: "Repertoire", href: "/repository"},
      { name: "Reservations", href: "/reservations"},
    ]},

    { title: "Legal", items: [
      { name: "Terms & Conditions", href: "/terms"},
      { name: "Privacy Policy", href: "/policy"},
    ]},
  ];


  return (
    <footer className="max-w-full bg-background text-foreground relative overflow-hidden px-6 py-10 sm:px-10 sm:py-16 mb-0">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-10 justify-between flex-wrap">
        <div className="col-span-3 md:col-span-3">
          <div className="mb-4 -mt-4 shrink-0">
            <BbLogo width={70} />
          </div>
          <p className="text-justify">
            ipsum dolor sit amet consectetur adipisicing elit. Iure nulla inventore fugiat. Recusandae nisi eum, asper
          </p>
          <div className="mt-4">
            <LocalSwitcher />
          </div>
        </div>
        {menuItems.map((menuItem, index) => (
        <div className="col-span-1 md:col-span-1" key={index}>
          <h2 className="mb-6 text-foreground font-semibold">{menuItem.title}</h2>
          <ul className="">
            {menuItem.items.map((item, index) => (
            <li
              key={index}
              className="mb-2"
            >
              <Link
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                size="md" aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
            </li>
            ))}
          </ul>
        </div>
        ))}
      </div>
      <Divider className="my-6 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="sm:text-center text-small">
          © { new Date().getFullYear() } <span className="pointer-events-none">Brain-Booster™</span>. Tous droits réservés.
        </span>
        <ul className="flex mt-4 gap-4.5 items-center justify-center sm:mt-0">
          {socialNetwork.map((item, index) => (
          <li
            key={index}
            className="mb-2"
          >
            <Link
              isExternal
              href={item.href} color={pathname === item.href ? "warning" : "foreground"}
              className="whitespace-nowrap" size="sm"
              aria-current={pathname === item.href ? "page" : "false"}
              >{item.icon}</Link>
          </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}