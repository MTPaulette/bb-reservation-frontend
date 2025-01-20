"use client";

import { ReservationType } from '@/lib/definitions';
import Title from '../Title';
import { useLocale, useTranslations } from 'next-intl';
import { capitalize,formatCurrency, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";

import { CalendarIcon, ClockIcon, UserIcon, VerticalDotsIcon } from "@/components/Icons";
import Modal from "@/components/Modal";
import Link from "next/link";
import { 
  Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, User, Chip, Image, ChipProps
} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import CancelReservation from '../admin/FormElements/Reservation/Cancel';
import { useState } from 'react';
import NewPayment from '../admin/FormElements/Payment/New';

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};


export function ReservationCard({reservation} :{ reservation: ReservationType }) {
  const locale = useLocale();
  const t_table = useTranslations("Table");
  const t_ressource = useTranslations("Ressource");
  const t_reservation = useTranslations("Reservation");
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const cancel_reservation_permissions: string[] = ["manage_reservations", "cancel_all_reservation", "cancel_reservation_of_agency", "cancel_own_reservation"];
  const view_ressource_permissions: string[] = ["manage_ressources", "view_ressource", "view_ressource_of_agency"];
  const view_client_permissions: string[] = ["view_client"];
  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];
  const new_reservation_permissions: string[] = ["manage_reservations", "create_reservation", "create_reservation_of_agency"];

  return (
    <>
      <div className="flex gap-x-4">
        <Title className="font-semibold text-xl">{t_ressource("reservation_informations")}</Title>
        <div>
          <Dropdown className="bg-background border-1 border-divider">
            <DropdownTrigger>
              <Button isIconOnly radius="full" size="sm" variant="light" className="z-1">
                <VerticalDotsIcon fill="none" size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                className={
                  new_reservation_permissions.some(permission =>
                  permissions.includes(permission)) ? "block" : "hidden"
                }
                color="success"
                onClick={() => {
                  setShowPaymentModal(true);
                }}
              >{t_table("new_payment")}</DropdownItem>
              <DropdownItem
                className={
                  cancel_reservation_permissions.some(permission =>
                  permissions.includes(permission)) ? "block" : "hidden"
                }
                color="danger"
                onClick={() => {
                  setShowCancelModal(true);
                }}
              >{t_table("cancelReservation")}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <ul className="mt-4 text-sm space-y-1 md:space-y-0.5">
        <li>
          <dl className="w-full flex items-center justify-between font-semibold">
            <dt>{t_reservation("id")} :</dt>
            <dd>{reservation.id}</dd>
          </dl>
        </li>
        <li className="my-2">
          <dl className="w-full flex items-center justify-between">
            <dt className="font-semibold">{t_reservation("state")} :</dt>
            <dd className="font-bold text-white">
              <Chip
                className="capitalize" size="md" variant="solid" radius="none"
                color={
                  reservation.state == "partially paid" ? statusColorMap["partially_paid"] : 
                  reservation.state == "totally paid" ? statusColorMap["totally_paid"] : 
                  statusColorMap[reservation.state]
                }
                >
                {reservation.state}
              </Chip>
            </dd>
          </dl>
        </li>
        <li>
          <dl className="w-full flex items-center justify-between">
            <dt className="font-semibold">{t_reservation("total_amount")} :</dt>
            <dd className="text-foreground/60">{formatCurrency(reservation.initial_amount)}</dd>
          </dl>
        </li>
        <li>
          <dl className="w-full flex items-center justify-between">
            <dt className="font-semibold">{t_reservation("amount_due")} :</dt>
            <dd className="text-foreground/60">{formatCurrency(reservation.amount_due)}</dd>
          </dl>
        </li>
        <li>
          <dl className="w-full flex items-center justify-between">
            <dt className="font-semibold">{t_reservation("agency")} :</dt>
            <dd className="text-foreground font-medium truncate">{reservation.ressource.agency.name}</dd>
          </dl>
        </li>
        <li className="w-full flex flex-wrap gap-2 justify-between items-center mt-2 mb-4">
          <dl className="mt-2 w-full sm:w-auto grid grid-cols-3 items-center md:block">
            <dt className="mb-1 font-semibold">{t_reservation("date")}</dt>
            <dd className="flex items-center space-x-4 col-span-2">
              <div className="flex flex-shrink-0 h-8 w-8 items-center justify-center text-foreground/60 rounded-full bg-content2">
                <CalendarIcon fill="currentColor" size={20} />
              </div>
              <div>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("start")}</dt>
                  <dd className="text-foreground/60 truncate">{reservation.start_date}</dd>
                </dl>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("end")}</dt>
                  <dd className="text-foreground/60 truncate">{reservation.end_date}</dd>
                </dl>
              </div>
            </dd>
          </dl>
          <dl className="mt-2 w-full sm:w-auto grid grid-cols-3 items-center md:block">
            <dt className="mb-1 font-semibold">{t_reservation("hour")}</dt>
            <dd className="flex items-center space-x-4 col-span-2">
              <div className="flex flex-shrink-0 h-8 w-8 items-center justify-center text-foreground/60 rounded-full bg-content2">
                <ClockIcon fill="currentColor" size={20} />
              </div>
              <div>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("start")}</dt>
                  <dd className="text-foreground/60 truncate">{reservation.start_hour} (GMT+1)</dd>
                </dl>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("end")}</dt>
                  <dd className="text-foreground/60 truncate">{reservation.end_hour} (GMT+1)</dd>
                </dl>
              </div>
            </dd>
          </dl>
        </li>

        <li>
          <dl className="mt-2 w-full sm:w-auto grid grid-cols-3 items-center md:block">
            <dt className="mb-1 font-semibold">{t_reservation("staff")}</dt>
            <dd className="flex items-center space-x-4 col-span-2">
              <div className="flex flex-shrink-0 h-8 w-8 items-center justify-center text-foreground/60 rounded-full bg-content2">
                <UserIcon fill="currentColor" size={20} />
              </div>
              <div className="w-full">
              <div className="w-full">
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("created_by")}</dt>
                  <dd className="text-foreground/60 truncate">
                    {!permissions ? null : (
                      <>
                      {view_staff_permissions.some(permission =>
                      permissions.includes(permission)) ? (
                        <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`} className="font-medium">
                          {reservation.created_by.firstname && reservation.created_by.lastname? getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
                        </Link>
                      ): (
                        <span>
                          {reservation.created_by.firstname && reservation.created_by.lastname? getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
                        </span>
                      )}
                      </>
                    )}
                  </dd>
                </dl>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-medium text-foreground/80">{t_reservation("at")}</dt>
                  <dd className="text-foreground/60 truncate">{formatDateTime(reservation.created_at)}</dd>
                </dl>
              </div>
              {reservation.state == "cancelled" && reservation.cancelled_by ? (
              <div className="w-full text-danger mt-2">
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-semibold">{t_reservation("cancelled_by")}</dt>
                  <dd className="font-medium truncate">
                    {!permissions ? null : (
                      <>
                      {view_staff_permissions.some(permission =>
                      permissions.includes(permission)) ? (
                        <Link href={`/${locale}/admin/staff/${reservation.cancelled_by.id}`} className="font-medium">
                          {reservation.cancelled_by.firstname && reservation.cancelled_by.lastname? getUsername(reservation.cancelled_by.lastname, reservation.cancelled_by.firstname): ""}
                        </Link>
                      ): (
                        <span>
                          {reservation.cancelled_by.firstname && reservation.cancelled_by.lastname? getUsername(reservation.cancelled_by.lastname, reservation.cancelled_by.firstname): ""}
                        </span>
                      )}
                      </>
                    )}
                  </dd>
                </dl>
                <dl className="w-full flex gap-x-3 items-center justify-between">
                  <dt className="font-semibold">{t_reservation("at")}</dt>
                  <dd className="font-medium truncate">{formatDateTime(reservation.cancelled_at)}</dd>
                </dl>
              </div>
              ): null }</div>
            </dd>
          </dl>
        </li>
        
        {reservation.state == "cancelled" ? (
          <li>
            <dl className="w-full flex gap-x-3 justify-between text-danger mt-4">
              <dt className="font-semibold">{t_reservation("reason_for_cancellation")}</dt>
              <dd className="dark:font-extralight text-justify">{reservation.reason_for_cancellation ? reservation.reason_for_cancellation+"lore Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus minus consequuntur itaque quia, ullam quod lam veniam amet. Excepturi." : ""}</dd>
            </dl>
          </li>
        ): null }

        <li>
          {/* <dl className="w-full flex items-center justify-between mb-8"> */}
          <dl className="w-full mt-2 mb-8">
            <dt className="font-semibold">{t_reservation("note")} :</dt>
            <dd className="dark:font-extralight text-justify mt-1">{reservation.note ? reservation.note : "-"}</dd>
          </dl>
        </li>

        {/* client informations */}
        <li className="my-8 py-8 border-y-2 border-divider dark:border-white/20">
          <Title className="font-semibold text-xl">{t_ressource("client_informations")}</Title>
          <div className="mt-6">
            <User
              avatarProps={
                {className:"flex-shrink-0 mr-2", radius: "full", size: "md", src: reservation.client.image? getImageUrl(reservation.client.image) : "" }
              }
              classNames={{
                name: "font-semibold",
                description: "text-foreground/60",
              }}
              description={reservation.client.email}
              name = {!permissions ? "" : (
                <>
                  {view_client_permissions.some(permission =>
                  permissions.includes(permission)) ? (
                    <Link href={`/${locale}/admin/clients/${reservation.client.id}`}>
                      {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
                    </Link>
                  ): (
                    <span>
                      {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
                    </span>
                  )}
                </>
              )}
            />
          </div>
        </li>
        

        {/* ressource informations */}
        <li className="my-8">
          <Title className="font-semibold text-xl mb:mb-6 sm:my-6">{t_ressource("ressource_informations")}</Title>
          <div className="mt-6">
            <div className="flex gap-x-6">
              {reservation.ressource.space.images && reservation.ressource.space.images[0] ?
                <Image
                  src={getImageUrl(reservation.ressource.space.images[0].src)}
                  alt="space image"
                  className="relative"
                  classNames={{
                    img: ["w-30", "h-auto"]
                  }}
                />
              : null }
              <div className="mb-4 md:mb-6">
                <>
                {!permissions ? null : (
                  <>
                  {view_ressource_permissions.some(permission =>
                  permissions.includes(permission)) ? (
                    <Link href={`/${locale}/admin/ressources/${reservation.ressource.id}`}>
                      <Title className="text-xl font-semibold sm:text-2xl">
                        {capitalize(reservation.ressource.space.name)}
                      </Title>
                    </Link>
                  ): (
                    <Title className="text-xl font-semibold sm:text-2xl">
                      {capitalize(reservation.ressource.space.name)}
                    </Title>
                  )}
                  </>
                )}
                </>
                {reservation.ressource.agency ? (
                  <p className="mt-1 font-light text-tiny">{t_ressource("from")}:
                  <span className="font-medium ms-2">
                    {reservation.ressource.agency.name? capitalize(reservation.ressource.agency.name): ""}
                  </span>
                  </p>
                ): null }
                <p className="text-foreground/60 text-justify mt-2">
                  {capitalize(locale === "en" ? reservation.ressource.space.description_en: reservation.ressource.space.description_fr)}
                </p>
              </div>
            </div>

            {/* characteristics */}
            {reservation.ressource.space && reservation.ressource.space.characteristics ? (
              <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
                {reservation.ressource.space.characteristics.map((item) => (
                  <li key={item.id}>
                    <Chip color="default" size="md" variant="flat">
                      {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                    </Chip>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      </ul>

      {/* MODALS */}
      <div>
        <Modal
          open={showPaymentModal} close={() => setShowPaymentModal(false)}
          title={`${t_table("editReservation")} "${reservation.ressource.space.name}"`}
        >
          <NewPayment reservation_id={reservation.id} />
        </Modal>

        <Modal
          open={showCancelModal} close={() => setShowCancelModal(false)}
          title={`${t_table("cancelReservation")} "${reservation ? reservation.id: ''}"`}
        >
          <CancelReservation id={reservation?.id} state={reservation?.state} />
        </Modal>
      </div>
    </>
  );
}
