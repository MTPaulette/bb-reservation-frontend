import React from "react";
import { Metadata } from "next";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Breadcrumb from "@/components/admin/Breadcrumb";
import Title from "@/components/Title";
import Profile from "@/components/admin/Settings/Profile";

export const metadata: Metadata = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};



const Settings = () => {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [currentGroup, setCurrentGroup] = React.useState<string>(searchParams.get('group')? searchParams.get('group'): 'profile');

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
        <Breadcrumb pageName="Settings" />
        <div className="grid grid-cols-12 md:gap-8">
          <div className="col-span-12 md:col-span-4 xl:col-span-3 min-ww-45 mb-8 md:mb-0">
            <div className="flex flex-col md:gap-y-8">
              <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
                <ul className="flex flex-col">
                  <li className="border-b border-divider px-3 py-4">
                    <Title className="font-semibold text-foreground/50">
                      Informations Personnelles
                    </Title>
                  </li>
                  <li className="border-b border-divider px-3 py-2">Profile</li>
                </ul>
              </div>

              <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
                <ul className="flex flex-col">
                  <li className="border-b border-divider px-3 py-4">
                    <Title className="font-semibold text-foreground/50">
                      Informations Generalles
                    </Title>
                  </li>
                  <li className="border-b border-divider px-3 py-2">Entreprise</li>
                  <li className="border-b border-divider px-3 py-2">Email</li>
                  <li className="border-b border-divider px-3 py-2">Finance</li>
                  <li className="border-b border-divider px-3 py-2">PDF</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 xl:col-span-9">
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
