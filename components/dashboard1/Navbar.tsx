"use client";

import React from "react";
import { useSession } from "next-auth/react";

import {
  Navbar, NavbarContent, NavbarItem, Link, Button,
  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar,
  NavbarMenuToggle, NavbarMenu, User
} from "@nextui-org/react";

import { usePathname } from "next/navigation";

import ThemeSwitcher from "@/components/ThemeSwitcher";
import NavLinks from "@/components/dashboard1/Navlinks";
import Logout from "@/components/admin/FormElements/Logout";
import Title from "@/components/Title";
import { getImageUrl, getUsername } from "@/lib/utils";

export default function NavBarDashboardComponent() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      className="justify-between bg-transparent text-foreground/50 h-16 text-small"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden"
        />
        <Title className="text-lg md:text-base lg:text-lg hidden md:block">{pathname.split("/")[1]}</Title>
        {/* <Title className="text-lg md:text-lg hidden md:block">danshboard</Title> */}
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
  
        <NavbarItem>
          <Button
            as={Link} href="/login" size="sm"
            className="bg-gradient-to-tr from-success to-[#262262] text-white hover:no-underline shadow-lg"
          >
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
              name={user? user.name: ""}
              size="sm"
              src={user? getImageUrl(user.image): ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem>
              <User
                isFocusable
                name={user? getUsername(user.lastname, user.firstname): ""}
                description="admin"
                avatarProps={
                  {radius: "full", size: "sm", src: user && user.image? getImageUrl(user.image) : "" }
                }
              />
            </DropdownItem>
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user? user.email : ""}</p>
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
        <div>
          <Logout />
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
