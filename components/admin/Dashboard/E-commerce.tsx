"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../DataStats/Card1";
import { CalendarIcon, CharetIcon, PeopleIcon, PlusIcon, ShoppingBagIcon } from "@/components/Icons";
import { useLocale, useTranslations } from 'next-intl';
import { Button } from "@nextui-org/react";
import Modal from "@/components/Modal";
import NewReservation from "../FormElements/Reservation/New";
import { CommonSkeleton } from "@/components/Skeletons";
import { signOut } from "next-auth/react";
import { getStatistics } from "@/lib/action/dashbord";
import Alert from "@/components/Alert";
import { formatCurrency } from "@/lib/utils";

const MapOne = dynamic(() => import("@/components/admin/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/admin/Charts/ChartThree"), {
  ssr: false,
});;


export default function ECommerce() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_statistic = useTranslations("Statistic");
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    setError("");
    getStatistics()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setStatistics(await res.json());
        }else {
          const status = res.status;
          switch(status) {
            case 401:
              setError(t_error("unauthenticated"));
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
              break;
            case 403:
              setError(t_error("acces_denied"));
              break;
            case 404:
              setError(t_error("server_not_found"));
              break;
            case 500:
              setError(t_error("something_wrong"));
              break;
            default:
              break;
          }
        }
      })
      .catch((error: any) => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);

  const [showNewModal, setShowNewModal] = useState<boolean>(false);
  const t_table = useTranslations("Table");

  return (
    <>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
      {/* {JSON.stringify(statistics)} */}
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

      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"> */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title={t_statistic("total_reservations")} total={statistics.totalReservations} rate="0.43%" levelUp>
          <CalendarIcon fill="currentColor" size={20} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_payments")} total={statistics.totalPayments ? formatCurrency(Number(statistics.totalPayments)) : 0} rate="4.35%" levelUp>
          <CharetIcon fill="currentColor" size={20} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_ressources")} total={statistics.totalRessources} rate="2.55%" levelUp>
          <ShoppingBagIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_clients")} total={statistics.totalClients} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_staff")} total={statistics.totalStaff} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne series={statistics.agency_with_payments_per_month} />
        <ChartTwo series={statistics.payment_revenu_of_current_week} />
        <ChartThree data={statistics.ressource_with_reservations} />
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
    </div>
    )}
    </>
  );
};
