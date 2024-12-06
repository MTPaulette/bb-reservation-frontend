"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../DataStats/Card1";
import { CharetIcon, EyeIcon, PeopleIcon, PlusIcon, ShoppingBagIcon } from "@/components/Icons";
import { useTranslations } from 'next-intl';
import { Button } from "@nextui-org/react";
import Modal from "@/components/Modal";
import NewReservation from "../FormElements/Reservation/New";

const MapOne = dynamic(() => import("@/components/admin/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/admin/Charts/ChartThree"), {
  ssr: false,
});;


export default function ECommerce() {

  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const t_table = useTranslations("Table");

  return (
    <>
      {/* <!-- new purchase --> */}
      <div className="w-full flex justify-end py-4">
        <Button
          endContent={<PlusIcon fill="currentColor" size={14} />}
          size="sm" variant="solid"
          onClick={() => setShowNewModal(true)}
          className="bg-gradient-to-tr from-success to-[#262262] text-white hover:no-underline shadow-lg"
        >
          {t_table("newReservation")}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <EyeIcon fill="currentColor" size={20} />
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
          <CharetIcon fill="currentColor" size={20} />
        </CardDataStats>
        <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
          <ShoppingBagIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>

      <div>
      <Modal
        open={showNewModal} close={() => setShowNewModal(false)}
        title="" size="4xl"
        // title={t_table("newReservation")} size="4xl"
      >
        <NewReservation />
      </Modal>
      </div>
    </>
  );
};
