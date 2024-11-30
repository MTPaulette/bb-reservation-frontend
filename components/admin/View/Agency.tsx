"use client"

import React from "react";
import { getAgencyById } from '@/lib/action/agencies';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, formatDateTime, getUsername } from "@/lib/utils";

import { EnvelopIcon, LocalisationIcon, VerticalDotsIcon, TelephoneIcon } from "@/components/Icons";
import { 
  Button, Tabs, Tab, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, } from "@nextui-org/react";

import Modal from "@/components/Modal";
import EditAgency from "@/components/admin/FormElements/Agency/Edit";
import SuspendAgency from "@/components/admin/FormElements/Agency/Suspend";
import DeleteAgency from "@/components/admin/FormElements/Agency/Delete";
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import CardWrapper from "@/components/admin/DataStats/Card2";
import Link from "next/link";
import { columnsTabsStaffAgency, columnsTabsRessourceAgency } from "@/lib/data";
import DefaultUserTable from "../Tables/DefaultUserTable";
import DefaultRessourceTable from "../Tables/DefaultRessourceTable";

export default function ViewAgency({id}: {id: string}) {
  const [agency, setAgency] = useState([]);
  const [ressources, setRessources] = useState([]);
  const [administrators, setAdministrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showSuspendModal, setShowSuspendModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_tabs = useTranslations("Tabs");
  const t_alert = useTranslations("Alert");
  const [selected, setSelected] = React.useState<string>("reservations");

  useEffect(() => {
    setError("");
    getAgencyById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setAgency(response.agency);
          setRessources(response.ressources);
          setAdministrators(response.administrators);
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


  if (!agency) {
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
            {/* agency */}
            <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
              <div className="border-b border-divider px-7 py-4">
                <Title className="font-medium text-foreground uppercase">{t_tabs("contact")}</Title>
              </div>
              <div className="p-6 space-y-4 md:space-y-8">
                <dl>
                  <dt className="font-medium">{t_tabs("phonenumber")}</dt>
                  <dd className="flex items-center gap-1 text-foreground/60">
                    <TelephoneIcon fill="currentColor" size={18} />
                    <span>{agency.phonenumber ? agency.phonenumber: "-"}</span>
                  </dd>
                </dl>
                <dl>
                  <dt className="font-medium">{t_tabs("email")}</dt>
                  <dd className="flex items-center gap-1 text-foreground/60">
                    <EnvelopIcon fill="currentColor" size={18} />
                    <span>{agency.email ? agency.email: "-"}</span>
                  </dd>
                </dl>
                <dl>
                  <dt className="font-medium">{t_tabs("address")}</dt>
                  <dd className="flex items-center gap-1 text-foreground/60">
                    <LocalisationIcon fill="currentColor" size={18} />
                    <span>{agency.address ? agency.address: "-"}</span>
                  </dd>
                </dl>
              </div>
            </div>

            {/* agency */}
            <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
              <div className="border-b border-divider px-7 py-4">
                <Title className="font-medium text-foreground uppercase">{t_tabs("openingdays")}</Title>
              </div>
              <div className="p-6">
                {agency.openingdays.length > 0 ? (
                  <div className="flex flex-wrap gap-6 sm:gap-2 w-full justify-start sm:justify-between items-center">
                    {agency.openingdays.map((item) => (
                      <dl key={item.id}>
                        <dt className="font-semibold">{capitalize(locale === "en" ? item.name_en: item.name_fr)}</dt>
                        <dd className="text-foreground/60">
                          {`(${item.pivot.from} - ${item.pivot.to})`}</dd>
                      </dl>
                    ))}
                  </div>
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
                    {capitalize(agency.name)}
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
                          color="warning"
                          onClick={() => {
                            setShowSuspendModal(true);
                          }}
                        >{agency.status == 'active'? t_table("suspend"): t_table("cancel_suspend")}</DropdownItem>
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
                {agency.created_by ? (
                  <p className="mt-1 font-light text-tiny"> {t_tabs("created_by")}:
                    <Link href={`/${locale}/admin/staff/${agency.created_by.id}`} className="font-medium ms-2">
                      {agency.created_by.firstname && agency.created_by.lastname ?
                        getUsername(agency.created_by.lastname, agency.created_by.firstname)
                      : ""}
                    </Link>
                  </p>
                ): null }
                {agency.created_at? (
                  <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_tabs("since")}: {formatDateTime(agency.created_at)}</p>
                ): ""}
                <div className="flex items-center gap-2">
                  <div
                    className={`my-3 inline-block rounded px-1.5 py-0.5 uppercase font-bold text-sm text-white
                    ${agency.status == "active"? "bg-success" :"bg-danger"}`}
                  >{agency.status}</div>
                  <div>
                    {agency.status == 'suspended' && agency.suspended_by ? (
                      <p className="mt-1 font-light text-tiny"> {t_tabs("suspended_by")}:
                        <Link href={`/${locale}/admin/staff/${agency.suspended_by.id}`} className="font-medium ms-2">
                          {agency.suspended_by.firstname && agency.suspended_by.lastname ?
                            getUsername(agency.suspended_by.lastname, agency.suspended_by.firstname)
                          : ""}
                        </Link>
                      </p>
                    ): null }
                  </div>
                </div>
                <div>
                  {agency.status != "active" ? (
                    <p className="text-foreground/60 text-justify pt-4">
                      {locale === "en" ? agency.reason_for_suspension_en: agency.reason_for_suspension_fr}
                    </p>
                  ): null}
                </div>
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 py-4 md:py-6">
                <CardWrapper />
              </div>
            </div>
          </div>
        </div>

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
                key="administrators"
                title={t_tabs("administrators")}
              >
                {administrators.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultUserTable columns={columnsTabsStaffAgency} users={administrators} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_administrator")} />
                  </div>
                )}
              </Tab>
              <Tab key="ressources" title={t_tabs("ressources")}>
                {ressources.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultRessourceTable columns={columnsTabsRessourceAgency} ressources={ressources} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_ressource")} />
                  </div>
                )}
              </Tab>
              <Tab key="reservations" title={t_tabs("reservations")}>
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
          title={`${t_table("editAgency")} "${agency? agency.name: ""}"`}
        >
          <EditAgency agency={agency} />
        </Modal>
    
        <Modal
          open={showSuspendModal} close={() => setShowSuspendModal(false)}
          title={`${t_table("suspendAgency")} "${agency? agency.name: ''}"`}
        >
          <SuspendAgency id={agency?.id} status={agency?.status} />
        </Modal>
        
        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteAgency")} "${agency? agency.name: ''}"`}
        >
          <DeleteAgency id={agency?.id} />
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