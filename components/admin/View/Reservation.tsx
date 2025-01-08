"use client"

import React from "react";
import { getReservationById } from '@/lib/action/admin/reservations';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize,formatCurrency, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";
import { validitiesName as validities } from "@/lib/data";

import { VerticalDotsIcon } from "@/components/Icons";
import { 
  Button, Tabs, Tab, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Image,
  User,
  Chip
} from "@nextui-org/react";

import Modal from "@/components/Modal";
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Alert from "@/components/Alert";
import Link from "next/link";
import CancelReservation from "../FormElements/Reservation/Cancel";


export default function ViewReservation({id}: {id: string}) {
  const [reservation, setReservation] = useState([]);
  const [ressource, setRessource] = useState([]);
  const [client, setClient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_ressource = useTranslations("Ressource");
  const t_alert = useTranslations("Alert");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_reservations", "view_reservation", "view_reservation_of_agency"];

  const cancel_reservation_permissions: string[] = ["manage_reservations", "cancel_all_reservation", "cancel_reservation_of_agency", "cancel_own_reservation"];

  const view_agency_permissions: string[] = ["manage_agency", "manage_all_agencies"];
  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];

  useEffect(() => {
    setError("");
    getReservationById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setReservation(response.reservation);
          setRessource(response.ressource);
          setClient(response.client);
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
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);


  if (!reservation) {
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
    <div className="grid grid-cols-12 md:gap-12">
      <div className="col-span-12 sm:col-span-8 pr-0 sm:pr-8">
        <div className="mb-6 sm:mb-0">
          <Title className="font-semibold text-xl text-foreground">{t_ressource("transaction_informations")}</Title>
          <div className="mt-6 text-justify text-foreground/60">
            Vous avez entamé la réservation de la ressource <span className="font-semibold text-foreground">{ressource.space.name} </span>
            de l&apos;agence de <span className="font-semibold text-foreground">{ressource.agency.name}</span> pour le client
            <span className="font-semibold text-foreground"> {getUsername(client.lastname, client.firstname)} </span>
            allant du <span className="font-semibold text-foreground">{reservation.start_date}</span> au
            <span className="font-semibold text-foreground"> {reservation.end_date} </span>
            de <span className="font-semibold text-foreground">{reservation.start_hour}</span> au
            <span className="font-semibold text-foreground"> {reservation.end_hour}</span>.

            <p className="mt-6">
              La somme à payer pour cette réservation est:
              <span className="inline-block rounded ml-1 px-1.5 py-0.5 uppercase font-bold text-sm bg-success text-white"> {formatCurrency(reservation.initial_amount)}</span>
            </p>
            {reservation.coupon ? (
              <p className="mt-6">
                Grace à l&apos;utilisation du coupon <span className="font-semibold text-foreground whitespace-nowrap">{reservation.coupon.name}  |  {reservation.coupon.code} </span>
                {/* qui vous donne droit à une réduction de <span className="font-semibold text-foreground"> {coupon.percent ? coupon.percent+' %' :  coupon.amount? formatCurrency(coupon.amount): ''}</span>, */}
                le reste à payer pour cette reservation est donc de 
                <span className="inline-block rounded ml-1 px-1.5 py-0.5 uppercase font-bold text-sm bg-success text-white"> {formatCurrency(reservation.amount_due)}</span>
              </p>
            ) : null }
          </div>
        </div>
        <div className="border-t-2 border-divider pt-6 mt-6">
          <Title className="font-semibold text-xl text-foreground">{t_ressource("client_informations")}</Title>
          <div className="mt-6">
            <User
              avatarProps={
                {className:"flex-shrink-0", radius: "full", size: "lg", src: client.image? getImageUrl(client.image) : "" }
              }
              classNames={{
                name: "font-semibold",
                description: "text-foreground/60",
              }}
              description={client.email}
              name={
                <Link href={`/${locale}/admin/clients/${client.id}`}>
                  {getUsername(client.lastname, client.firstname)}
                </Link>
              }
            />
          </div>
          {/* characteristics */}
          <div className="border-t-2 border-divider pt-6 mt-6 hidden sm:block">
            <Title className="font-semibold text-xl text-foreground">{t_ressource("characteristics")}</Title>
            {ressource.space && ressource.space.characteristics.length > 0 ? (
              <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
                {ressource.space.characteristics.map((item) => (
                  <li key={item.id}>
                    <Chip color="default" size="md" variant="flat">
                      {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                    </Chip>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className="col-span-12 sm:col-span-4">
        <div className="border-t-2 border-divider pt-6 mt-6 sm:border-none sm:pt-0 sm:mt-0">
          <Title className="font-semibold text-xl text-foreground mb:mb-6 sm:my-6">{t_ressource("ressource_informations")}</Title>

        <div className="mb-4 md:mb-6">
          <Title className="text-xl font-semibold sm:text-2xl">
            {capitalize(ressource.space.name)}
          </Title>
          {ressource.agency ? (
            <p className="mt-1 font-light text-tiny">{t_ressource("from")}:
              <span className="font-medium ms-2">
                {ressource.agency.name? capitalize(ressource.agency.name): ""}
              </span>
            </p>
          ): null }
        </div>
        <p className="text-foreground/60 text-justify mt-2">
          {capitalize(locale === "en" ? ressource.space.description_en: ressource.space.description_fr)}
        </p>
        <div>
        {ressource.space && ressource.space.images.length > 0 ? (
          <>
            <div className="mt-2">
              <Image
                isBlurred
                src={getImageUrl(ressource.space.images[0].src)}
                alt="NextUI Album Cover"
                className="relative"
                classNames={{
                  img: ["w-full", "h-auto"]
                }}
              />
            </div>
            <div className="w-full mt-6 h-full flex flex-wrap gap-6 items-center justify-start">
              {ressource.space.images.map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <Image
                    width={80}
                    height={80}
                    radius="sm"
                    src={getImageUrl(item.src)}
                    alt="space image"
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
        </div>
        {/* characteristics */}
        <div className="border-t-2 border-divider pt-6 mt-6 block sm:hidden">
          <Title className="font-semibold text-xl text-foreground">{t_ressource("characteristics")}</Title>
          {ressource.space && ressource.space.characteristics.length > 0 ? (
            <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
              {ressource.space.characteristics.map((item) => (
                <li key={item.id}>
                  <Chip color="default" size="md" variant="flat">
                    {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                  </Chip>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        </div>
      </div>

      <div className="col-span-12 relative flex justify-end items-center gap-2">
        <Dropdown className="bg-background border-1 border-divider">
          <DropdownTrigger>
            <Button isIconOnly radius="full" size="sm" variant="light" className="z-1">
              <VerticalDotsIcon fill="none" size={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              className={
                cancel_reservation_permissions.some(permission =>
                permissions.includes(permission)) ? "block" : "hidden"
              }
              color="danger"
              onClick={() => {
                setShowCancelModal(true);
              }}
            >{t_table("cancel")}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>

      {/* MODALS */}
      <div>
        <Modal
          open={showCancelModal} close={() => setShowCancelModal(false)}
          title={`${t_table("cancelReservation")} "${ressource ? ressource.space.name: ''}"`}
        >
          <CancelReservation id={reservation?.id} state={reservation?.state} />
        </Modal>
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