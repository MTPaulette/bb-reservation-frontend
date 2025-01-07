"use client";

import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem, User
} from "@nextui-org/react";

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import { BbLogo } from "@/components/BbLogo";
import { ChevronDownIcon, SettingIcon, UserIcon } from "@/components/Icons";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Logout from "@/components/admin/FormElements/Logout";

import { getImageUrl, getUsername } from "@/lib/utils";

export default function NavBarComponent() {
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = useLocale();

  const { data: session } = useSession();
  const user = session?.user;

  const communityItems = [
    { name_en: "Products", name_fr: "Articles", href: "/products"},
    { name_en: "Events", name_fr: "Evènement", href: "/event"},
    { name_en: "Repository", name_fr: "Repertoire", href: "/repository"},
  ];

  const reservationItems = [
    { name_en: "Agency", name_fr: "Agency", href: "/meeting_corner"},
    { name_en: "Reservations", name_fr: "Réservations", href: "/reservations"},
  ];

  const menuItems_1 = [
    { name_en: "Why choose Brain-Booster ?", name_fr: "Pourquoi Brain-Booster ?", href: "/about"},
    { name_en: "Community", name_fr: "Communauté", href: "/community"},
    { name_en: "Visit us", name_fr: "Faire une visite", href: "/visit-us"},
    { name_en: "Reservations", name_fr: "Réservations", href: "/reservations"},
  ];

  return (
    <Navbar
      isBordered
      className="shadow-medium bg-background text-foreground/50 text-small py-2"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:-bottom-2",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-warning",
        ],
      }}
    >

      <NavbarContent className="md:hidden max-w-[25px] -ml-1" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand className="block md:hidden">
        <Link href="/" className="flex-shrink-0">
          <BbLogo width={50} />
        </Link>
      </NavbarBrand>


      <NavbarContent className="hidden md:flex sm:gap-4 md:gap-1.5 lg:gap-4" justify="center">
        <NavbarBrand className="hidden md:block min-w-[72px] p-2">
          <BbLogo width={60} />
        </NavbarBrand>
        
        {/* Pourquoi Brain-Booster ? */}
        <NavbarItem isActive={pathname === `/${locale}/about`}>
          <Link href={`/${locale}/about`} className="text-foreground text-small">{t("about")}</Link>
        </NavbarItem>

        {/* community */}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon fill="currentColor" size={10} />}
                radius="sm"
                variant="light"
              >
                Communauté
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Community Items"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {communityItems.map((item, index) => (
            <DropdownItem
              key={`${item}-${index}`} data-hover={pathname === item.href}
              // className="data-[hover=true]:bg-primary"
            >
              <Link
                href={`/${locale}${item.href}`} color={pathname === `/${locale}${item.href}` ? "warning" : "foreground"}
                className="whitespace-nowrap" size="sm"
                aria-current={pathname === item.href ? "page" : "false"}
              >
                {locale === "en" ? item.name_en: item.name_fr}
              </Link>
            </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        
        {/* Faire une visit ? */}
        <NavbarItem isActive={pathname === `/${locale}/visit-us`}>
          <Link href={`/${locale}/visit-us`} className="text-foreground text-small">{t("visit_us")}</Link>
        </NavbarItem>

        {/* reservations */}
        <NavbarItem isActive={pathname === `/${locale}/reservations`}>
          <Link href={`/${locale}/reservations`} className="text-foreground text-small">{t("reservations")}</Link>
        </NavbarItem>

        {/* booking */}
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon fill="currentColor" size={10} />}
                radius="sm"
                variant="light"
              >
                Booking
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Reservation Items"
            className="w-[180px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {reservationItems.map((item, index) => (
            <DropdownItem 
              key={`${item}-${index}`}
            >
              <Link
                href={`/${locale}${item.href}`} color={pathname === `/${locale}${item.href}` ? "warning" : "foreground"}
                className="whitespace-nowrap" size="sm"
                aria-current={pathname === item.href ? "page" : "false"}
              >
                {locale === "en" ? item.name_en: item.name_fr}
              </Link>
            </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>


      <NavbarContent as="div" justify="end">
        {/* dark mode switcher */}
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
  
        {!user ? (
        <NavbarItem>
          <Button 
            as={Link} href={`/${locale}/auth/login`} 
            className="bg-gradient-to-tr from-success to-[#262262] text-white hover:no-underline shadow-lg"
          >
            {t("login")}
          </Button>
        </NavbarItem>
        ): (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div>
              <div className="block md:hidden flex-shrink-0">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="warning"
                  // name={user? getUsername(user.lastname, user.firstname): ""}
                  size="sm"
                  src={user && user.image? getImageUrl(user.image) : ''}
                />
              </div>
              <div className="hidden md:flex items-center gap-3">
                <User
                  isFocusable
                  name={user? getUsername(user.lastname, user.firstname): ""}
                  description={user? user.role: ""}
                  avatarProps={
                    {className:"flex-shrink-0", radius: "full", size: "sm", src: user && user.image? getImageUrl(user.image) : "" }
                  }
                />
                <ChevronDownIcon fill="currentColor" size={10} />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem className="block md:hidden">
              <User
                isFocusable
                name={user? getUsername(user.lastname, user.firstname): ""}
                description={user? user.role: ""}
                avatarProps={
                  {className:"flex-shrink-0", radius: "full", size: "sm", src: user && user.image? getImageUrl(user.image) : "" }
                }
              />
            </DropdownItem>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold truncate">{t("signedAs")}</p>
              <p className="font-semibold">{user? user.email : ""}</p>
            </DropdownItem>
            <DropdownItem key="dashboard" className="p-0 m-0">
              <Link href={`/${locale}/admin/`} className="truncate group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-foreground duration-300 ease-in-out hover:bg-default">
                <SettingIcon fill="currentColor" size={18} />
                {t("dashboard")}
              </Link>
            </DropdownItem>
            <DropdownItem key="prodile" className="p-0 m-0">
              <Link href={`/${locale}/admin/profile`} className="truncate group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-foreground duration-300 ease-in-out hover:bg-default">
                <UserIcon fill="currentColor" size={18} />
                {t("profile")}
              </Link>
            </DropdownItem>
            <DropdownItem key="settings" className="p-0 m-0">
              <Link href={`/${locale}/admin/settings?group=general`} className="truncate group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-foreground duration-300 ease-in-out hover:bg-default">
                <SettingIcon fill="currentColor" size={18} />
                {t("settings")}
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" className="p-0 m-0 mt-2 border-t-1 border-divider rounded-none">
              <Logout />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        )}
      </NavbarContent>

      <NavbarMenu className="pt-8 bg-background">
        {menuItems_1.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={`/${locale}${item.href}`} color={pathname === `/${locale}${item.href}` ? "primary" : "foreground"}
              className="w-full whitespace-nowrap text-base" size="lg"
            >
              {locale === "en" ? item.name_en: item.name_fr}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
