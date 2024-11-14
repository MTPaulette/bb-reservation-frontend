"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Breadcrumb from "@/components/admin/Breadcrumb";
import Profile from "@/components/admin/FormElements/Settings/Profile";
import Email from "@/components/admin/FormElements/Settings/Email";
import General from "@/components/admin/FormElements/Settings/General";
import Finance from "@/components/admin/FormElements/Settings/Finance";
import Pdf from "@/components/admin/FormElements/Settings/Pdf";
import { useTranslations } from "next-intl";

const links: string[] = ["general", "profile", "email", "finance", "pdf"]

export default function Settings () {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const t = useTranslations("Settings");
  const pathname = usePathname();
  const [currentGroup, setCurrentGroup] = React.useState<string|null>(searchParams.get('group')? searchParams.get('group'): 'profile');

  const changeGroup = (group: string) => {
    const params = new URLSearchParams(searchParams);

    if(group != currentGroup){
      params.set('group', String(group));
      setCurrentGroup(group);
      console.log(group)
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="settings" />
        <div className="grid grid-cols-12 md:gap-8">
          <div className="col-span-12 md:col-span-4 xl:col-span-3 min-ww-45 mb-8 md:mb-0">
            <div className="flex flex-col md:gap-y-8 cursor-pointer">
              <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
                <ul className="flex flex-col">
                  {links.map((link, index) => (
                    <li key={index} className={`border-b border-divider px-3 py-4 capitalize hover:text-warning ${currentGroup === link ? "text-warning" : ""}`} onClick={() => { changeGroup(link) }}>{t(link)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 xl:col-span-9">
            {currentGroup === "general" ? <General /> : ""}
            {currentGroup === "profile" ? <Profile /> : ""}
            {currentGroup === "email" ? <Email /> : ""}
            {currentGroup === "finance" ? <Finance /> : ""}
            {currentGroup === "pdf" ? <Pdf /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};
