"use client";

import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import DropdownNotification from "./DropdownNotification";
// import User from "@/components/User";
import Image from "next/image";
import { ChevronDownIcon, SettingIcon, UserIcon } from "@/components/Icons";
import Logout from "@/components/admin/FormElements/Logout";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';

import { DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, User } from "@nextui-org/react";
import { getImageUrl, getUsername } from "@/lib/utils";
import Search from "@/components/Search";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const { data: session } = useSession();
  const user = session?.user;
  const t = useTranslations("Header");
  const locale = useLocale();

  return (
    <header className="sticky top-0 z-10 flex w-full bg-content2 drop-shadow-1 dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-divider bg-bg-content2 p-1.5 shadow-sm lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden sm:block">
          <div className="w-full sm:w-[250px] xl:w-125">
            <Search placeholder={t("search_placeholder")} />
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <li><ThemeSwitcher /></li>
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <Dropdown>
            <DropdownTrigger>
              <div>
                <div className="block md:hidden">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
