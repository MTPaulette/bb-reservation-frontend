"use client";

import React, { Suspense } from "react";
import { Metadata } from 'next';
import { useSearchParams } from 'next/navigation';
import { Image, Button } from "@nextui-org/react";
import { CheckIcon } from "@/components/Icons";
import FindRessource from "@/components/FindRessource";
import Pagination from "@/components/Pagination";
import { InvoicesTableSkeleton } from '@/components/Skeletons';
// import { fetchRessources } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resevations | BB-RESERVATION-SYST',
};


export default function RessourcesWrapper() {
  const searchParams = useSearchParams();

  return (
    <>
    <div> 
      <FindRessource />
      <Suspense fallback={<InvoicesTableSkeleton />}>
      <div className="mt-8 mb-12 w-full flex flex-wrap justify-center sm:justify-around items-center gap-6">
        <RessourceCard />
        <RessourceCard />
        <RessourceCard />
        <RessourceCard />
        <RessourceCard />
        <RessourceCard />
      </div>
      </Suspense>
      <div className="w-full flex justify-center items-center mb-8">
        <Pagination totalPages={8} />
      </div>
    </div>
    </>
  );
};

export function RessourceCard() {
  return (
    <>
    <div className="border-none bg-background dark:bg-background/70 w-full lg:w-[420px] xl:w-[550px] rounded-md">
      <div className="grid grid-cols-12 items-start justify-center p-0 m-0">
        <div className="relative col-span-4 h-[150px] md:h-[180px] overflow-hidden">
          <Image
            alt="Album cover"
            className="lg:object-cover rounded-tl-md rounded-bl-md shadow-default"
            height={180}
            shadow="md"
            radius="none"
            src="/images/brain-orange-400.png"
            width="auto"
          />
        </div>

        <div className="col-span-8 h-full flex flex-col justify-between p-3 pt-1 md:p-4 md:pt-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-0">
              <h3 className="font-semibold text-foreground/90 h-[20px] truncate mt-1 md:mt-2 w-full whitespace-normal">Daily Mix</h3>
              <p className="text-small text-foreground/80">12 Tracks</p>
              <h1 className="text-small text-justify font-medium text-foreground/60 h-[40px] md:h-[60px] truncate mt-2 w-full whitespace-normal">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla harum omnis inventore beatae
                incidunt facilis, dicta ipsam, tempore consectetur blanditiis voluptatum quod iure tempo
                ra officiis aliquam dolore rerum voluptas numquam?
              </h1>
            </div>
          </div>
          <div className="w-full flex justify-end mt-1 md:mt-0">
            <Button
              disableRipple radius="sm" variant="solid"
              size="sm" color="primary"
              startContent={<CheckIcon fill="currentColor" size={10} />}
            >
              Réservez maintenant
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}