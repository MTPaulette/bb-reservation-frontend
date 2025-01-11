"use client"

import React from "react";
import { getRessourceById } from '@/lib/action/admin/ressources';
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
  DropdownItem, Image
} from "@nextui-org/react";

import Modal from "@/components/Modal";
import EditRessource from "@/components/admin/FormElements/Ressource/Edit";
import DeleteRessource from "@/components/admin/FormElements/Ressource/Delete";
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Alert from "@/components/Alert";
import Link from "next/link";
import DefaultReservationTable from "../Tables/DefaultReservationTable";
// import Image from "next/image";

export default function ViewRessource({id}: {id: string}) {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [notFoundStatus, setNotFoundStatus] = useState(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_ressource = useTranslations("Ressource");
  const t_alert = useTranslations("Alert");
  const [selected, setSelected] = React.useState<string>("ressources");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_ressources", "view_ressource", "view_ressource_of_agency"];

  const update_ressource_permissions: string[] = ["manage_ressources", "edit_ressource", "edit_ressource_of_agency"];
  const delete_ressource_permissions: string[] = ["manage_ressources", "delete_ressource", "delete_ressource_of_agency"];

  const view_agency_permissions: string[] = ["manage_agency", "manage_all_agencies"];
  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];

  useEffect(() => {
    setError("");
    getRessourceById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setResponse(response);
          // setReservations(response.reservations);
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
  }, []);


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
    <div className="grid grid-cols-12 md:gap-8">
      <div className="col-span-12 md:col-span-6 order-2 md:order-1 lg:col-span-5 xl:col-span-4 min-ww-45">
        <div className="flex flex-col gap-y-8 cursor-text">
          {/* prices */}
          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
            <div className="border-b border-divider px-7 py-4">
              <Title className="font-medium text-foreground uppercase">{t_ressource("price")}</Title>
            </div>
            <div className="p-6 space-y-4 md:space-y-8">
              <p>
                {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
                <span className="font-bold pl-2 text-sm">{response.ressource.price_hour? formatCurrency(response.ressource.price_hour) : ""}</span>
              </p>
              <p className="whitespace-nowrap">
                {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
                <span className="font-bold pl-2 text-sm">{response.ressource.price_midday? formatCurrency(response.ressource.price_midday) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
                <span className="font-bold pl-2 text-sm">{response.ressource.price_day? formatCurrency(response.ressource.price_day) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
                <span className="font-bold pl-2 text-sm">{response.ressource.price_week? formatCurrency(response.ressource.price_week) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
                <span className="font-bold pl-2 text-sm">{response.ressource.price_month? formatCurrency(response.ressource.price_month) : ""}</span>
              </p>
            </div>
          </div>

          {/* characteristics */}
          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
            <div className="border-b border-divider px-7 py-4">
              <Title className="font-medium text-foreground uppercase">{t_ressource("characteristics")}</Title>
            </div>
            <div className="p-6">
              {response.ressource.space && response.ressource.space.characteristics.length > 0 ? (
                <ul className="space-y-6 sm:space-y-2 w-full">
                  {response.ressource.space.characteristics.map((item) => (
                    <li key={item.id}>
                      {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 order-1 md:order-2 lg:col-span-7 xl:col-span-8 my-8 md:my-0">
        <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default py-8 antialiased">
          <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
            <div className="mb-4 md:mb-6">
              {/* title */}
              <div className="w-full flex justify-between items-center">
                <Title className="text-2xl font-semibold sm:text-3xl">
                  {capitalize(response.ressource.space.name)}
                </Title>
                <div className="relative flex justify-end items-center gap-2">
                  <Dropdown className="bg-background border-1 border-divider">
                    <DropdownTrigger>
                      <Button isIconOnly radius="full" size="sm" variant="light" className="z-1">
                        <VerticalDotsIcon fill="none" size={24} />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        className={
                          update_ressource_permissions.some(permission =>
                          permissions.includes(permission)) ? "block" : "hidden"
                        }
                        onClick={() => {
                          setShowEditModal(true);
                        }}
                      >{t_table("edit")}</DropdownItem>
                      <DropdownItem
                        className={
                          delete_ressource_permissions.some(permission =>
                          permissions.includes(permission)) ? "block" : "hidden"
                        }
                        color="danger"
                        onClick={() => {
                          setShowDeleteModal(true);
                        }}
                      >{t_table("delete")}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <span className="font-semibold">
                  {response.ressource.quantity}
                </span>
                <span className="text-sm sm:whitespace-nowrap">
                  {capitalize(t_ressource("rooms_availables"))}
                </span>
              </div>
              
              
              <>
              {!permissions || !response.ressource.agency ? null : (
                <>
                {view_agency_permissions.some(permission =>
                permissions.includes(permission)) ? (
                  <p className="mt-1 font-light text-tiny"> {t_ressource("from")}:
                    <Link href={`/${locale}/admin/agencies/${response.ressource.agency.id}`} className="font-medium ms-2">
                      {response.ressource.agency.name? capitalize(response.ressource.agency.name): ""}
                    </Link>
                  </p>
                ): (
                  <p className="mt-1 font-light text-tiny"> {t_ressource("from")}:
                    <span className="font-medium ms-2">
                      {response.ressource.agency.name? capitalize(response.ressource.agency.name): ""}
                    </span>
                  </p>
                )}
                </>
              )}
              </>

              <>
              {!permissions || !response.ressource.created_by ? null : (
                <>
                {view_staff_permissions.some(permission =>
                permissions.includes(permission)) ? (
                  <p className="mt-1 font-light text-tiny"> {t_ressource("created_by")}:
                    <Link href={`/${locale}/admin/staff/${response.ressource.created_by.id}`} className="font-medium ms-2">
                      {response.ressource.created_by.firstname && response.ressource.created_by.lastname ?
                        getUsername(response.ressource.created_by.lastname, response.ressource.created_by.firstname)
                      : ""}
                    </Link>
                  </p>
                ): (
                  <p className="mt-1 font-light text-tiny"> {t_ressource("created_by")}:
                    <span className="font-medium ms-2">
                      {response.ressource.created_by.firstname && response.ressource.created_by.lastname ?
                        getUsername(response.ressource.created_by.lastname, response.ressource.created_by.firstname)
                      : ""}
                    </span>
                  </p>
                )}
                </>
              )}
              </>

              {response.ressource.created_at? (
                <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_ressource("at")}: {formatDateTime(response.ressource.created_at)}</p>
              ): ""}
            </div>
            <p className="text-foreground/60 text-justify pt-4">
              {capitalize(locale === "en" ? response.ressource.space.description_en: response.ressource.space.description_fr)}
            </p>

            {response.ressource.space && response.ressource.space.images.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6 py-4 md:py-6">
              {response.ressource.space.images.map((item) => (
                <div key={item.id} className="flex-shrink-0">
                  <Image
                    src={getImageUrl(item.src)}
                    alt="space image"
                    radius="none"
                    width={140}
                    height={140}
                  />
                </div>
              ))}
            </div>
            ) : (
              <div className="mt-2 px-3 py-5">
                <Alert color="default" message={t_alert("no_image")} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-span-12 order-3 mt-6 md:mt-8 py-6 md:py-8 border-t border-divider z-1">
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
            <Tab key="reservations" title={t_ressource("reservations")}>
              {response.reservations.length > 0 ? (
                <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                  <DefaultReservationTable reservations={response.reservations} />
                </div>
              ): (
                <div className="mt-2 px-3 py-5">
                  <Alert color="default" message={t_alert("no_reservation")} />
                </div>
              )}
            </Tab>
            {/* <Tab key="reservations" title={t_ressource("reservations")}>
              <Tabs
                isVertical
                aria-label="Reservations" 
                color="primary"
                radius="sm"
                variant="solid"
              >
                <Tab key="photos" title="Photos">
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    photo
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </Tab>
                <Tab key="music" title="Music">
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    music
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </Tab>
                <Tab key="videos" title="Videos">
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    videos
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </div>
                </Tab>
              </Tabs>
            </Tab> */}
          </Tabs>
        </div>
      </div>
    </div>




      {/* MODALS */}
      <div>
        <Modal
          open={showEditModal} close={() => setShowEditModal(false)}
          title={`${t_table("editRessource")} "${response.ressource? response.ressource.space.name: ""}"`}
        >
          <EditRessource ressource={response.ressource} />
        </Modal>

        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteRessource")} "${response.ressource? response.ressource.space.name: ''}"`}
        >
          <DeleteRessource id={response.ressource?.id} />
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
