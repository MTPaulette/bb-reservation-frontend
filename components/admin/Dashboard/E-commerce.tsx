"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import TopClients from "./TopClients";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../DataStats/Card1";
import { CalendarIcon, ChevronDownIcon, PeopleIcon, PlusIcon, ShoppingBagIcon } from "@/components/Icons";
import { useLocale, useTranslations } from 'next-intl';
import { Button } from "@nextui-org/react";
import Modal from "@/components/Modal";
import NewReservation from "../FormElements/Reservation/New";
import { CommonSkeleton } from "@/components/Skeletons";
import { signOut } from "next-auth/react";
import { getStatistics } from "@/lib/action/dashbord";
import Alert from "@/components/Alert";
import { formatCurrency, getUsername } from "@/lib/utils";
import { availableStats, Months } from "@/lib/data";
import CardDataStats3 from "../DataStats/Card3";
import CurrentReservations from "./CurrentReservations";

const MapOne = dynamic(() => import("@/components/admin/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/admin/Charts/ChartThree"), {
  ssr: false,
});;


export default function ECommerce() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [selectedStat, setSelectedStat] = useState<string>("Generals stat.");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_statistic = useTranslations("Statistic");
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    setError("");
    getStatistics()
      .then(async (res) => {
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
        setLoading(false);
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

      <div className="relative z-20 inline-block mb-3">
        <select
          onChange={(e) => {
            setSelectedStat(e.target.value);
          }}
          name=""
          id=""
          className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 outline-none font-semibold text-foreground tracking-wider text-xl"
        >
          {availableStats.map((item) => (
            <option key={item.uid} value={item.uid} className="dark:bg-boxdark">
              {locale === "en" ? item.name_en: item.name_fr}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
          <ChevronDownIcon fill="currentColor" size={10} />
        </span>
      </div>
      {selectedStat == "Generals stat." ? (
      // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="flex flex-wrap justify-between items-center gap-4 md:gap-5">
        <CardDataStats3
          title={t_statistic("best_agency")}
          subtitle={t_statistic("reservations")}
          value={statistics.bestAgency.name}
          total={statistics.bestAgency.reservations_count}
        />
        <CardDataStats3
          title={t_statistic("most_ressource_agency")}
          subtitle={t_statistic("ressources")}
          value={statistics.agencyWithMostRessources.name}
          total={statistics.agencyWithMostRessources.ressources_count}
        />
        <CardDataStats3
          title={t_statistic("best_staff")}
          subtitle={t_statistic("created_reservations")}
          value={getUsername(statistics.bestStaff.lastname, statistics.bestStaff.firstname)}
          total={statistics.bestStaff.created_reservations_count}
        />
        <CardDataStats3
          title={t_statistic("best_client")}
          subtitle={t_statistic("reservations")}
          value={getUsername(statistics.bestClient.lastname, statistics.bestClient.firstname)}
          total={statistics.bestClient.reservations_count}
        />
        <CardDataStats3
          title={t_statistic("best_ressource")}
          subtitle={t_statistic("reservations")}
          value={statistics.bestRessource.space.name}
          total={statistics.bestRessource.reservations_count}
        />
        {statistics.bestMonth != null ? (
          <CardDataStats3
            title={t_statistic("best_month")}
            subtitle={t_statistic("reservations")}
            value={locale === "en" ? Months[Number(statistics.bestMonth.month)-1].name_en: Months[Number(statistics.bestMonth.month)-1].name_fr}
            total={statistics.bestMonth.count}
          />
        ) : null}
      </div>
      ) : null}

      {selectedStat == "Users stat." ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:gap-3 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title={t_statistic("total_clients")} total={statistics.totalClients} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_staff")} total={statistics.totalStaff} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
      </div>
      ) : null}

      {selectedStat == "Payments stat." ? (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title={t_statistic("total_revenue")} total={formatCurrency(Number(statistics.totalRevenue))} rate="2.55%" levelUp>
          <ShoppingBagIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_payment")} total={formatCurrency(Number(statistics.totalPayments))} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_due")} total={formatCurrency(Number(statistics.totalDue))} rate="0.95%" levelDown>
          <PeopleIcon fill="currentColor" size={22} />
        </CardDataStats>
      </div>
      ) : null}

      {selectedStat == "Reservations stat." ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title={t_statistic("total_ressources")} total={statistics.totalRessources} rate="2.55%" levelUp>
          <ShoppingBagIcon fill="currentColor" size={22} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_reservations")} total={statistics.totalReservations} rate="0.43%" levelUp>
          <CalendarIcon fill="currentColor" size={20} />
        </CardDataStats>
        <CardDataStats title={t_statistic("total_cancelled_reservations")} total={statistics.totalCancelledReservations} rate="0.43%" levelUp>
          <CalendarIcon fill="currentColor" size={20} />
        </CardDataStats>
      </div>
      ) : null}

      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
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
      </div> */}

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne series={statistics.agency_with_payments_per_month} />
        <ChartTwo series={statistics.payment_revenu_of_current_week} />
        <ChartThree data={statistics.ressource_with_reservations} />
        <MapOne title={t_statistic("map")} />
        {/* <div className="col-span-12 xl:col-span-8"> */}
        {/* <TableOne /> */}
        <div className="col-span-12">
          <CurrentReservations reservations={statistics.currentReservations} />
        </div>
        <div className="col-span-12">
          <TopClients clients={statistics.topClients} />
        </div>
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
