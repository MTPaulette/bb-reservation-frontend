"use client";

import React, { useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import DashboardSkeleton, { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/components/Skeletons";
import Breadcrumbs from "@/components/dashboard1/Breadcrumbs";
import CardWrapper from "@/components/admin/DataStats/Card2";
import Search from "@/components/Search";
import LatestInvoices from "@/components/dashboard1/LatestInvoices";
import Charts from "@/components/dashboard1/Charts";


export default function DashboardPage() {
  const { data: session } = useSession();
  console.log(session?.user.name);
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
            { label: "Invoices", href: "/dashboard/invoices" },
            {
              label: "Create Invoice",
              href: "/dashboard/invoices/create",
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
        <div>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <Suspense fallback={<CardsSkeleton />}>
              <CardWrapper />
            </Suspense>
          </div>

          <div className="mt-6 md:mt-12 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <Suspense fallback={<RevenueChartSkeleton />}>
              <Charts />
            </Suspense>
            {/* <Suspense fallback={<LatestInvoicesSkeleton />}>
              <LatestInvoices />
            </Suspense> */}
          </div>

          <div className="grid grid-cols-2 text-white pt-10">
            <div className="text-center">
              <h1 className="text-black text-xl font-bold">
                Hi {session?.user.name}!
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
