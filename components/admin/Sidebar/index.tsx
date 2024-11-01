"use client";

import React from "react";
import Link from "next/link";
import SidebarItem from "@/components/admin/Sidebar/SidebarItem";
import ClickOutside from "@/components/admin/ClickOutside";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { BbLogo } from "@/components/BbLogo";
import { CalendarIcon, UserIcon, FormIcon, TableIcon, SettingIcon, ChartIcon, LogoutIcon, ThreeHorizontalBarIcon, UiIcon, DashboardIcon } from "@/components/Icons";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <DashboardIcon fill="none" size={18} />
        ),
        label: "Dashboard",
        route: "#",
        children: [{ label: "eCommerce", route: "/admin" }],
      },
      {
        icon: (
          <CalendarIcon fill="none" size={18} />
        ),
        label: "Calendar",
        route: "/admin/calendar",
      },
      {
        icon: (
          <UserIcon fill="none" size={18} />
        ),
        label: "Profile",
        route: "/admin/profile",
      },
      {
        icon: (
          <FormIcon fill="none" size={18} />
        ),
        label: "Forms",
        route: "#",
        children: [
          { label: "Form Elements", route: "/admin/forms/form-elements" },
          { label: "Form Layout", route: "/admin/forms/form-layout" },
        ],
      },
      {
        icon: (
          <TableIcon fill="none" size={18} />
        ),
        label: "Tables",
        route: "/admin/tables",
      },
      {
        icon: (
          <SettingIcon fill="none" size={18} />
        ),
        label: "Settings",
        route: "/admin/settings",
      },
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      {
        icon: (
          <ChartIcon fill="none" size={18} />
        ),
        label: "Chart",
        route: "/admin/chart",
      },
      {
        icon: (
          <UiIcon fill="none" size={18} />
        ),
        label: "UI Elements",
        route: "#",
        children: [
          { label: "Alerts", route: "/admin/ui/alerts" },
          { label: "Buttons", route: "/admin/ui/buttons" },
        ],
      },
      {
        icon: (
          <LogoutIcon fill="none" size={18} />
        ),
        label: "Authentication",
        route: "#",
        children: [
          { label: "Sign In", route: "/admin/auth/signin" },
          { label: "Sign Up", route: "/admin/auth/signup" },
        ],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-background bgg-[#131033] duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 pt-5.5 pb-3.5 lg:pb-3.5 lg:pt-6.5">
          <Link href="/">
            <BbLogo width={100} />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <ThreeHorizontalBarIcon fill="none" size={18} />
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-2 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-foreground/50">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
