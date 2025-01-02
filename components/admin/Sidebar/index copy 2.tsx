"use client";

import React from "react";
import Link from "next/link";
import SidebarItem from "@/components/admin/Sidebar/SidebarItem";
import ClickOutside from "@/components/admin/ClickOutside";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { BbLogo } from "@/components/BbLogo";
import { CalendarIcon, UserIcon, FormIcon, TableIcon, SettingIcon, ChartIcon, LogoutIcon, ThreeHorizontalBarIcon, UiIcon, DashboardIcon, PeopleIcon, ActivityIcon, CurrencyIcon, ExclamationTriangleIcon } from "@/components/Icons";
import { useLocale, useTranslations } from "next-intl";
import Logout from "@/components/admin/FormElements/Logout";
import { useSession } from "next-auth/react";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const locale = useLocale();
  const t_sidebar = useTranslations("Sidebar");

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: (
            <DashboardIcon fill="none" size={18} />
          ),
          label: t_sidebar("dashboard"),
          route: "#",
          children: [{ label: "eCommerce", route: `/${locale}/admin` }],
          permissions: ["view_dashboard"]
        },
        {
          icon: (
            <UserIcon fill="none" size={18} />
          ),
          label: t_sidebar("profile"),
          route: `/${locale}/admin/profile`,
          permissions: null
        },
        {
          icon: (
            <CalendarIcon fill="none" size={18} />
          ),
          label: t_sidebar("reservations"),
          route: `/${locale}/admin/reservations`,
          permissions: ["manage_reservations", "show_all_reservation", "show_all_reservation_of_agency"]
        },
        {
          icon: (
            <CurrencyIcon fill="currentColor" size={18} />
          ),
          label: t_sidebar("finances"),
          route: "#",
          children: [
            { label: t_sidebar("coupons"), route: `/${locale}/admin/coupons` },
            { label: t_sidebar("payments"), route: `/${locale}/admin/payments` },
          ],
          permissions: [
            "manage_coupons", "show_all_coupon",
            "manage_payments", "show_all_payment"
          ]
        },
        {
          icon: (
            <UiIcon fill="none" size={18} />
          ),
          label: t_sidebar("ressources"),
          route: "#",
          children: [
            { label: t_sidebar("characteristics"), route: `/${locale}/admin/characteristics` },
            { label: t_sidebar("spaces"), route: `/${locale}/admin/spaces` },
            { label: t_sidebar("ressources"), route: `/${locale}/admin/ressources` },
          ],
          permissions: [
            "manage_ressources", "show_all_ressource", "show_all_ressource_of_agency",
            "manage_spaces", "show_all_space",
            "create_space", "edit_space"
          ]
        },
        {
          icon: (
            <ActivityIcon fill="currentColor" size={18} />
          ),
          label: t_sidebar("utilities"),
          route: "#",
          children: [
            { label: t_sidebar("agencies"), route: `/${locale}/admin/agencies` },
            { label: t_sidebar("roles"), route: `/${locale}/admin/roles` },
            { label: t_sidebar("logs"), route: `/${locale}/admin/logs` },
          ],
          permissions: [
            "manage_agency", "manage_all_agencies",
            "manage_permissions",
            "view_logactivity"
          ]
        },
        {
          icon: (
            <PeopleIcon fill="currentColor" size={18} />
          ),
          label: t_sidebar("users"),
          route: "#",
          children: [
            { label: t_sidebar("clients"), route: `/${locale}/admin/clients` },
            { label: t_sidebar("staff"), route: `/${locale}/admin/staff` },
          ],
          permissions: [
            "show_all_client",
            "show_all_admin", "show_all_admin_of_agency", "show_all_superadmin"
          ]
        },
        {
          icon: (
            <CalendarIcon fill="none" size={18} />
          ),
          label: t_sidebar("calendar"),
          route: `/${locale}/admin/calendar`,
          permissions: ["manage_reservations", "show_all_reservation", "show_all_reservation_of_agency"]
        },
        /*
        {
          icon: (
            <FormIcon fill="none" size={18} />
          ),
          label: "Forms",
          route: "#",
          children: [
            { label: "Form Elements", route: `/${locale}/admin/forms/form-elements` },
            { label: "Form Layout", route: `/${locale}/admin/forms/form-layout` },
          ],
        },
        {
          icon: (
            <TableIcon fill="none" size={18} />
          ),
          label: "Tables",
          route: `/${locale}/admin/tables`,
        }, */
        {
          icon: (
            <SettingIcon fill="none" size={18} />
          ),
          label: t_sidebar("settings"),
          route: `/${locale}/admin/settings?group=profile`,
          permissions: ["view_dashboard"]
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
          route: `/${locale}/admin/chart`,
          permissions: ["view_dashboard"]
        },
        {
          icon: (
            <UiIcon fill="none" size={18} />
          ),
          label: "UI Elements",
          route: "#",
          children: [
            { label: "Alerts", route: `/${locale}/admin/ui/alerts` },
            { label: "Buttons", route: `/${locale}/admin/ui/buttons` },
          ],
          permissions: ["view_dashboard"]
        },
        {
          icon: (
            <LogoutIcon fill="none" size={18} />
          ),
          label: "Authentication",
          route: "#",
          children: [
            { label: "Sign In", route: `/${locale}/admin/auth/signin` },
            { label: "Sign Up", route: `/${locale}/admin/auth/signup` },
          ],
          permissions: ["view_dashboard"]
        },
      ],
    },
  ];


  return (
    <>
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-20 flex h-screen w-67 flex-col overflow-y-hidden bg-background bgg-[#131033] duration-300 ease-linear lg:translate-x-0 ${
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

                {!permissions ? (
                  null
                ) : (
                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <>
                    {!menuItem.permissions ? (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ) : (
                      <>
                      {menuItem.permissions.some(permission =>
                        permissions.includes(permission)) && (
                        <SidebarItem
                          key={menuIndex}
                          item={menuItem}
                          pageName={pageName}
                          setPageName={setPageName}
                        />
                      )}
                      </>
                    )}
                    </>
                  ))}
                </ul>
                )}
              </div>
            ))}
            <div className="-mt-3.5 mb-6">
              <Logout />
            </div>
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
    </>
  );
};

export default Sidebar;
