"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Profile from "@/components/admin/FormElements/Settings/Profile";
// import Email from "@/components/admin/FormElements/Settings/Email";
import General from "@/components/admin/FormElements/Settings/General";
import Finance from "@/components/admin/FormElements/Settings/Finance";
import Pdf from "@/components/admin/FormElements/Settings/Pdf";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { CommonSkeleton } from "@/components/Skeletons";

const links: string[] = ["profile"];
const links_with_options_setting: string[] = ["general", "profile", "finance", "pdf"];
// const links_with_options_setting: string[] = ["general", "profile", "email", "finance", "pdf"];

export default function IndexSettings () {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const t = useTranslations("Settings");
  const pathname = usePathname();
  const [currentGroup, setCurrentGroup] = React.useState<string|null>(searchParams.get('group')? searchParams.get('group'): 'profile');

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_options"];

  const changeGroup = (group: string) => {
    const params = new URLSearchParams(searchParams);

    if(group != currentGroup){
      params.set('group', String(group));
      setCurrentGroup(group);
      console.log(params.toString());
      if(permissions){
        if(requiredPermissions.some(permission => permissions.includes(permission))) {
          replace(`${pathname}?${params.toString()}`);
        } else {
          replace(`${pathname}?profile`);
        }
      } else {
        replace(`${pathname}?profile`);
      }
    }
  }

  return (
    <>
    {!permissions ? (
      <CommonSkeleton />
    ) : (
    <div className="grid grid-cols-12 md:gap-8">
      <div className="col-span-12 md:col-span-4 xl:col-span-3 min-ww-45 mb-8 md:mb-0">
        <div className="flex flex-col md:gap-y-8 cursor-pointer">
          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">

          <>
            {requiredPermissions.some(permission =>
              permissions.includes(permission)) ? (
              <ul className="flex flex-col">
                {links_with_options_setting.map((link, index) => (
                  <li key={index} className={`border-b border-divider px-3 py-4 capitalize hover:text-warning ${currentGroup === link ? "text-warning" : ""}`} onClick={() => { changeGroup(link) }}>{t(link)}</li>
                ))}
              </ul>
            ): (
              <ul className="flex flex-col">
                {links.map((link, index) => (
                  <li key={index} className={`border-b border-divider px-3 py-4 capitalize hover:text-warning ${currentGroup === link ? "text-warning" : ""}`} onClick={() => { changeGroup(link) }}>{t(link)}</li>
                ))}
              </ul>
            )}
          </>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        {currentGroup === "profile" ? <Profile /> : ""}
        <>
        {requiredPermissions.some(permission =>
        permissions.includes(permission)) && (
          <>
            {currentGroup === "general" ? <General /> : ""}
            {/* {currentGroup === "email" ? <Email /> : ""} */}
            {currentGroup === "finance" ? <Finance /> : ""}
            {currentGroup === "pdf" ? <Pdf /> : ""}
          </>
        )}
        </>
      </div>
    </div>
    )}
    </>
  );
};
