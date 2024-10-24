'use client';

import React, { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { CardsSkeleton } from "@/app/components/Skeletons";
import DashboardSkeleton from "@/app/components/Skeletons";
import Breadcrumbs from "@/app/components/dashboard/Breadcrumbs";
import CardWrapper from "@/app/components/dashboard/Cards";
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
    <div>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Create Invoice',
              href: '/dashboard/invoices/create',
              active: true,
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-end mt-2 mb-6 md:mb-10">
        <div className="w-full sm:w-[250px]">
          <Search placeholder="Type to search..." />
        </div>
      </div>
      {
        loading ? 
          <DashboardSkeleton />
        :
        // <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>


        <div className="grid grid-cols-2 text-white pt-10">
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
        </div>
      }
    </div>
    </>
  );
}
