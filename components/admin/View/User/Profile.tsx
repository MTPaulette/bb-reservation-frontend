"use client"

import Image from "next/image";
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";
import { Avatar, Tabs, Tab } from "@nextui-org/react";
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import { getProfile } from "@/lib/action/authentication";
import { columnsTabsClientCoupon } from "@/lib/data";
import DefaultCouponTable from "../../Tables/DefaultCouponTable";
import DefaultReservationTable from "../../Tables/DefaultReservationTable";



export default function ViewProfile() {
  const t = useTranslations("Profile");
  const t_table = useTranslations("Table");

  const [loading, setLoading] = useState(true);
  const [notFoundStatus, setNotFoundStatus] = useState(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_tabs = useTranslations("Tabs");
  const t_alert = useTranslations("Alert");
  const t_statistic = useTranslations("Statistic");
  const [selected, setSelected] = useState<string>("reservations");
  const [response, setResponse] = useState([]);
  

  useEffect(() => {
    setError("");
    getProfile()
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setResponse(response);
          setLoading(false);
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
              setNotFoundStatus(true);
              break;
            case 500:
              setError(t_error("something_wrong"));
              break;
            default:
              break;
          }
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);


  // if (!response) {
  if (notFoundStatus) {
    notFound();
  }

  return (
    <>
    <div className="w-full">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) :
    <>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <>
      <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default">
        <div className="relative z-2 h-35 md:h-65">
          <Image
            priority
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-3 mx-auto flex justify-center items-center -mt-24 sm:-mt-12 md:-mt-32 lg:-mt-40 xl:-mt-24 h-32 w-full max-w-30 sm:h-44 sm:max-w-44">
            <div className="relative drop-shadow-2 h-25 w-25 sm:h-30 sm:w-30 md:h-40 md:w-40">
              <Avatar
                src={response.user && response.user.image? getImageUrl(response.user.image): ""}
                isBordered
                color={response.user.status == 'active'? 'success': 'danger'}
                className="rounded-full h-full w-full"
                alt="profile pic"
              />
            </div>
          </div>
          <div className="mt-4">
            <Title className="text-2xl font-semibold text-foreground">
              {getUsername(response.user.lastname, response.user.firstname)}
            </Title>

            <p className="mt-2 font-light">
              {response.user.email} {response.user.phonenumber? ' | '+ response.user.phonenumber: ""}
            </p>
            <p className="font-semibold capitalize mt-1">
              {response.user.role ? response.user.role.name : ""}
            </p>

            <div className="mx-auto mb-5.5 mt-4.5 grid maxx-w-94 max-w-150 grid-cols-2 sm:grid-cols-3 gap-2 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2">
             
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalCoupons}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_coupons")} </span>
              </div>
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalReservations}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_reservations")} </span>
              </div>
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalCancelledReservations}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_cancelled_reservations")} </span>
              </div>
            </div>

            <div className="mx-auto max-w-203 flex flex-col items-center">
              <Title className="font-semibold text-foreground">
                {t("about")+' '+getUsername(response.user.lastname, response.user.firstname)}
              </Title>

              {response.user.work_at? (
                <p className="mt-1 font-light text-tiny"> {t_tabs("created_by")}:
                  <span className="font-medium ms-2">
                    {response.user.work_at.name?
                      capitalize(response.user.work_at.name)
                    : ""}
                  </span>
                </p>
              ): null}
              <p className="mt-1 font-light text-tiny"> {t_tabs("created_by")}:
                <span className="font-medium ms-2">
                  {response.user.created_by && response.user.created_by.firstname && response.user.created_by.lastname?
                    getUsername(response.user.created_by.lastname, response.user.created_by.firstname)
                  : "-"}
                </span>
              </p>

              {response.user.created_at? (
                <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_table("since")}: {formatDateTime(response.user.created_at)}</p>
              ): null}

              <div
                className={`my-3 inline-block rounded px-1.5 py-0.5 uppercase font-bold text-sm text-white
                ${response.user.status == "active"? "bg-success" :"bg-danger"}`}
              >
                {response.user.status}
              </div>

              {response.user.status != "active" ? (
                <>
                  <p className="mt-1 font-light text-tiny"> {t_tabs("suspended_by")}:
                    <span className="font-medium ms-2">
                      {response.user.suspended_by && response.user.suspended_by.firstname && response.user.suspended_by.lastname ?
                        getUsername(response.user.suspended_by.lastname, response.user.suspended_by.firstname)
                      : "-"}
                    </span>
                  </p>
                  <div className="mt-1.5 font-light text-tiny text-danger">
                    <p>{t_tabs("reason_for_suspension")}:</p>
                    <p className="font-medium">
                      {locale === "en" ? response.user.reason_for_suspension_en: response.user.reason_for_suspension_fr}
                    </p>
                  </div>
                </>
              ): null}
            </div>
          </div>
        </div>
      </div>


      {response.user.role_id == 2 ? (
      <div className="grid grid-cols-12 md:gap-8">
        <div className="col-span-12 mt-6 md:mt-8 py-6 md:py-8 border-t border-divider z-1">
          <div className="flex w-full flex-col">
            <Tabs
              fullWidth
              aria-label="Options"
              color="primary"
              radius="sm"
              variant="solid"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab 
                key="coupons"
                title={t_tabs("coupons")}
              >
                {response.coupons && response.coupons.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultCouponTable columns={columnsTabsClientCoupon} coupons={response.coupons} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_client")} />
                  </div>
                )}
              </Tab>
              <Tab key="reservations" title={t_tabs("reservations")}>
                {response.reservations && response.reservations.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultReservationTable reservations={response.reservations} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_reservation")} />
                  </div>
                )}
              </Tab>
              <Tab key="cancelled_reservations" title={t_tabs("cancelled_reservations")}>
                {response.cancelledReservations && response.cancelledReservations.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultReservationTable reservations={response.cancelledReservations} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_cancelled_reservation")} />
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      ): null}
    </>
    )}
    </>
    }
    </div>
    </>
  );
}