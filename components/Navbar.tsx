"use client";

import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,
  NavbarMenuToggle, NavbarMenu, NavbarMenuItem,
  Divider
} from "@nextui-org/react";

import { ChevronDownIcon } from "@/components/Icons";
import { usePathname } from "next/navigation";

import { BbLogo } from "@/components/BbLogo";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function NavBarComponent() {
  const pathname = usePathname();

  const communityItems = [
    { name: "Articles", href: "/products"},
    { name: "Evènement", href: "/event"},
    { name: "Repertoire", href: "/repository"},
  ];

  const reservationItems = [
    { name: "Agency", href: "/meeting_corner"},
    { name: "Réservations", href: "/reservations"},
  ];

  const menuItems_1 = [
    { name: "Pourquoi Brain-Booster ?", href: "/about"},
    { name: "Communaute", href: "/community"},
    { name: "Faire une visite", href: "/visit-us"},
    { name: "Reservations", href: "/reservations"},
  ];

  const menuItems_2 = [
    { name: "Profile", href: "/profile"},
    { name: "Dashboard", href: "/dashboard"},
    { name: "Activity", href: "/activity"},
    { name: "Analytics", href: "/analytics"},
  ];

  const menuItems_3 = [
    { name: "My Settings", href: "/settings"},
    { name: "Team Settings", href: "/team-settings"},
    { name: "Help & Feedback", href: "/Help-feedback"},
    { name: "Log Out", href: "/logout"},
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

      <NavbarBrand className="block md:hidden">
        <Link href="/">
          <BbLogo />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex sm:gap-4 md:gap-1.5 lg:gap-4" justify="center">
        <NavbarBrand className="hidden md:block min-w-[72px]">
          <BbLogo />
        </NavbarBrand>
        <NavbarItem isActive={pathname === "/about"}>
          <Link href="/about" className="text-foreground text-small">Pourquoi Brain-Booster ?</Link>
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
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                className="whitespace-nowrap" size="sm"
                aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
            </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        
        <NavbarItem isActive={pathname === "/visit-us"}>
          <Link href="/visit-us" className="text-foreground text-small">Faire une visite</Link>
        </NavbarItem>

        {/* reservations */}
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
                Reservation
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
                href={item.href} color={pathname === item.href ? "warning" : "foreground"}
                className="whitespace-nowrap" size="sm"
                aria-current={pathname === item.href ? "page" : "false"}
              >{item.name}</Link>
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
  
        <NavbarItem>
          <Button as={Link} href="/login" className="bg-gradient-to-tr from-success to-[#262262] text-white hover:no-underline shadow-lg">
          {/* <Button as={Link} href="/login" color="success" className="hover:no-underline text-white"> */}
            Sign Up
          </Button>
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="warning"
              name="Jason Hughes"
              size="sm"
              src="/images/brain-orange-400.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem></NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden max-w-[25px] -ml-1" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className="pt-8 bg-background">
        {menuItems_1.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.href} color={pathname === item.href ? "primary" : "foreground"}
              className="w-full whitespace-nowrap text-base" size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider className="my-3"></Divider>
        {menuItems_2.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.href} color={pathname === item.href ? "primary" : "foreground"}
              className="w-full whitespace-nowrap text-base md:text-large" size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider className="my-3"></Divider>
        {menuItems_3.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              href={item.href} color={pathname === item.href ? "primary" : index === menuItems_2.length - 1 ? "danger" : "foreground"}
              className="w-full whitespace-nowrap text-base md:text-large" size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}