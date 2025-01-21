"use client"

import React from "react";
import { getReservationById } from '@/lib/action/admin/reservations';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";

import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Alert from "@/components/Alert";
import { CouponType, PaymentType, ReservationType } from "@/lib/definitions";
import { PaymentCard } from "@/components/Card/Payment";
import { CouponCard } from "@/components/Card/Coupon";
import { ReservationCard } from "@/components/Card/Reservation";


export default function ViewReservation({id}: {id: string}) {
  const [reservation, setReservation] = useState<ReservationType>();
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [coupon, setCoupon] = useState<CouponType>();
  const [loading, setLoading] = useState(true);
  const [notFoundStatus, setNotFoundStatus] = useState(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_ressource = useTranslations("Ressource");
  const t_alert = useTranslations("Alert");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_reservations", "view_reservation", "view_reservation_of_agency"];

  useEffect(() => {
    setError("");
    getReservationById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setReservation(response.reservation);
          setPayments(response.payments);
          setCoupon(response.coupon);
          setLoading(false);
        }else {
          const status = res.status;
          switch(status) {
            case 401:
            setError(t_error("unauthenticated"));
            setTimeout(async () => {
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
            }, 500);
            break;
            case 403:
              setError(t_error("acces_denied"));
              break;
            case 404:
              // setError(t_error("server_not_found"));
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
  }, [id, locale, t_error]);


  // if (!reservation) {
  if (notFoundStatus) {
    notFound();
  }

  return (
    <>
    {!permissions ? (
      <CommonSkeleton />
    ) : (
    <>
    {requiredPermissions.every(permission =>
      !permissions.includes(permission)) && (
        redirect(`/${locale}/admin/forbidden`)
    )}

    <div className="w-full">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) :
    <>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div>
    <div className="grid grid-cols-12 gap-6 lg:gap-12">
      {/* <div className="col-span-12 sm:col-span-8 px-0 sm:px-4 lg::pl-0 sm:pr-8 flex flex-col gap-4 lg:gap-8"> */}
      <div className="col-span-12 lg:col-span-8 px-0 lg:px-4 lg:pl-0 lg:pr-8 flex flex-col gap-4 lg:gap-8">
        {reservation.state != "totally paid" && reservation.state != "cancelled" ?
          <div className="block max-w-screen">
            <Alert color="warning" message={t_alert("reservation_not_totally_paid_warning")} />
          </div>
        : null }
        {/* reservation informations */}
        <div className="rounded-md border border-divider px-5 py-6 bg-background shadow-default sm:px-7.5">
          <ReservationCard reservation={reservation} />
        </div>
      </div>


      {/* payment informations */}
      {/* <div className="col-span-12 sm:col-span-4"> */}
      <div className="col-span-12 lg:col-span-4">
        <div className="border-t-2 border-divider pt-6 mt-6 sm:border-none sm:pt-0 sm:mt-0">
          <Title className="font-semibold text-xl text-foreground mb:mb-6 sm:my-6">{t_ressource("payment_informations")}</Title>

          {/* characteristics */}
          <div className="mb-4 lg:mb-6">
            {coupon ?
              <div className="my-8">
                <CouponCard coupon={coupon} />
              </div>
            : null}
            {payments.length > 0 ? (
              // <ul className="w-full flex flex-col justify-between mt-6 gap-4 lg:gap-8">
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 justify-between mt-6 gap-4 sm:gap-6 md:gap-8 lg:gap-8">
              {/* <ul className="w-full flex flex-row flex-wrap lg:flex-col justify-between mt-6 gap-4 lg:gap-8"> */}
                {payments.map((payment) => (
                  <li key={payment.id}>
                    <PaymentCard payment={payment} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    </div>
    )}
    </>
    }
    </div>
    </>
    )}
    </>
  );
}
