'use client';

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import DashboardSkeleton from "@/app/components/Skeletons";
import Breadcrumbs from "@/app/components/dashboard/Breadcrumbs";
import Search from "@/app/components/dashboard/Search";


export default function DashboardPage() {
  const { data: session } = useSession();
  console.log(session?.user?.user.name);
  const [shown, setShown] = useState<boolean>(false);
  // let loading: boolean = true;

  const clickHandler = (): void => {
    setShown(!shown)
  };

  const loading: boolean = session? false : true;

  return (
    <>
    <div className="min-h-screen flex flex-col px-4 pt-6 md:pt-10">
      <div className="flex flex-wrap justify-between items-center">
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Reservations', href: '/dashboard/reservations' },
            {
              label: 'Create Invoice',
              href: '/dashboard/reservations/create',
              active: true,
            },
          ]}
        />
      </div>
        <div className="w-full flex justify-end mt-2">
        <div className="w-full md:w-[250px]">
          <Search placeholder="Type to search..." />
        </div>
        </div>
      {
        loading ? (
          <DashboardSkeleton />
        ):
        <div className="grid grid-cols-2 text-white p-4">
          <div className="text-center">
            <h1 className="text-black text-xl font-bold">
              Hi {session?.user?.user.name}!
            </h1>
          </div>
          <div>
            <p className="text-black">Protected client page</p>
            <button
              className="btn bg-blue-500 hover:bg-blue-400  p-4 "
              onClick={clickHandler}
            >
              Toggle
            </button>
            {shown ? (
              <pre className="text-black">{JSON.stringify(session, null, 2)}</pre>
            ) : null}
          </div>
        </div>
      }
    </div>
    </>
  );
}
