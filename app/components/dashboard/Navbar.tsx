"use client";

import React from "react";
import {
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,
  NavbarMenuToggle, NavbarMenu,
} from "@nextui-org/react";

import { usePathname } from "next/navigation";

import { BbLogo } from "@/app/components/BbLogo";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import NavLinks from "@/app/components/dashboard/Navlinks";
import Logout from "@/app/components/form/Logout";

export default function App() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      className="shadow-medium bg-background justify-between text-foreground/50 text-small py-2"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <NavbarBrand>
          <BbLogo />
        </NavbarBrand>
      </NavbarContent>
      {/* <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" size="sm">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" size="sm">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
  
        <NavbarItem>
          <Button as={Link} href="/login" className="bg-gradient-to-tr from-success to-[#262262] text-white hover:no-underline shadow-lg">
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
      </NavbarContent>

      <NavbarMenu className="pt-8 pb-6 bg-background">
        <NavLinks />
        <Logout />
      </NavbarMenu>
    </Navbar>
  );
}
