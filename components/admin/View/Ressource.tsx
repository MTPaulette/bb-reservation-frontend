"use client"

import React from "react";
import { getRessourceById } from '@/lib/action/ressources';
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
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import CardWrapper from "@/components/admin/DataStats/Card2";
import Link from "next/link";
// import Image from "next/image";

export default function ViewRessource({id}: {id: string}) {
  const [ressource, setRessource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_ressource = useTranslations("Ressource");
  const [selected, setSelected] = React.useState<string>("ressources");

  useEffect(() => {
    setError("");
    getRessourceById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setRessource(response.ressource);
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


  if (!ressource) {
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
    <div>
    <div className="grid grid-cols-12 md:gap-8">
      <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 min-ww-45">
        <div className="flex flex-col gap-y-8 cursor-text">
          {/* prices */}
          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
            <div className="border-b border-divider px-7 py-4">
              <Title className="font-medium text-foreground uppercase">{t_ressource("price")}</Title>
            </div>
            <div className="p-6 space-y-4 md:space-y-8">
              <p>
                {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
                <span className="font-bold pl-2 text-sm">{ressource.price_hour? formatCurrency(ressource.price_hour) : ""}</span>
              </p>
              <p className="whitespace-nowrap">
                {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
                <span className="font-bold pl-2 text-sm">{ressource.price_midday? formatCurrency(ressource.price_midday) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
                <span className="font-bold pl-2 text-sm">{ressource.price_day? formatCurrency(ressource.price_day) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
                <span className="font-bold pl-2 text-sm">{ressource.price_week? formatCurrency(ressource.price_week) : ""}</span>
              </p>
              <p>
                {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
                <span className="font-bold pl-2 text-sm">{ressource.price_month? formatCurrency(ressource.price_month) : ""}</span>
              </p>
            </div>
          </div>

          {/* characteristics */}
          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
            <div className="border-b border-divider px-7 py-4">
              <Title className="font-medium text-foreground uppercase">{t_ressource("characteristics")}</Title>
            </div>
            <div className="p-6">
              {ressource.space && ressource.space.characteristics.length > 0 ? (
                <ul className="space-y-6 sm:space-y-2 w-full">
                  {ressource.space.characteristics.map((item) => (
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

      <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 my-8 md:my-0">
        <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default py-8 antialiased">
          <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
            <div className="mb-4 md:mb-6">
              {/* title */}
              <div className="w-full flex justify-between items-center">
                <Title className="text-2xl font-semibold sm:text-3xl">
                  {capitalize(ressource.space.name)}
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
                        onClick={() => {
                          setShowEditModal(true);
                        }}
                      >{t_table("edit")}</DropdownItem>
                      <DropdownItem
                        color="danger"
                        onClick={() => {
                          setShowDeleteModal(true);
                        }}
                      >{t_table("delete")}</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              {ressource.agency ? (
                <p className="mt-1 font-light text-tiny"> {t_ressource("from")}:
                  <Link href={`/${locale}/admin/agencies/${ressource.agency.id}`} className="font-medium ms-2">
                    {ressource.agency.name? capitalize(ressource.agency.name): ""}
                  </Link>
                </p>
              ): null }
              {ressource.created_by ? (
                <p className="mt-1 font-light text-tiny"> {t_ressource("created_by")}:
                  <Link href={`/${locale}/admin/staff/${ressource.created_by.id}`} className="font-medium ms-2">
                    {ressource.created_by.firstname && ressource.created_by.lastname ?
                      getUsername(ressource.created_by.lastname, ressource.created_by.firstname)
                    : ""}
                  </Link>
                </p>
              ): null }
              {ressource.created_at? (
                <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_ressource("at")}: {formatDateTime(ressource.created_at)}</p>
              ): ""}
            </div>
            <p className="text-foreground/60 text-justify pt-4">
              {capitalize(locale === "en" ? ressource.space.description_en: ressource.space.description_fr)}
            </p>

            {/* stats */}
            <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 py-4 md:py-6">
              <CardWrapper />
            </div>
          </div>
        </div>
      </div>
  
      {ressource.space && ressource.space.images.length > 0 ? (
      <div className="col-span-12 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-divider z-1">
        <p className="mb-8 py-1.5 bg-primary text-white rounded-lg text-center text-sm">{capitalize(t_ressource("images"))}</p>
        <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default px-4 sm:px-6 py-8 antialiased">
          <div className="w-full flex flex-wrap items-center gap-2 sm:gap-x-8">
            {ressource.space.images.map((item) => (
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
        </div>
      </div>
      ) : null}

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
            <Tab key="reservations" title={t_ressource("reservations")}>
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
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>




      {/* MODALS */}
      <div>
        <Modal
          open={showEditModal} close={() => setShowEditModal(false)}
          title={`${t_table("editRessource")} "${ressource? ressource.space.name: ""}"`}
        >
          <EditRessource ressource={ressource} />
        </Modal>

        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteRessource")} "${ressource? ressource.space.name: ''}"`}
        >
          <DeleteRessource id={ressource?.id} />
        </Modal>
      </div>
    </div>
    )}
    </>
    }
    </div>
    </>
  )
}