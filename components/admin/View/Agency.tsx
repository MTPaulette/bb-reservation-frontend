"use client"

import React from "react";
import { getAgencyById } from '@/lib/action/agencies';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, getUsername } from "@/lib/utils";

import { EnvelopIcon, LocalisationIcon, PencilSquareIcon, TelephoneIcon } from "@/components/Icons";
import { Button } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

import Modal from "@/components/Modal";
import EditAgency from "@/components/admin/FormElements/Agency/Edit";
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import CardWrapper from "@/components/admin/DataStats/Card2";
import Link from "next/link";
import { columnsTabsStaff, columnsStaffRessource } from "@/lib/data";
import DefaultUserTable from "../Tables/DefaultUserTable";
import DefaultRessourceTable from "../Tables/DefaultRessourceTable";

export default function ViewAgency({id}: {id: string}) {
  const [agency, setAgency] = useState([]);
  const [ressources, setRessources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_agency = useTranslations("Agency");
  const t_alert = useTranslations("Alert");
  const [selected, setSelected] = React.useState<string>("ressources");

  useEffect(() => {
    setError("");
    getAgencyById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setAgency(response.agency);
          setRessources(response.ressources);
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
              <Title className="font-medium text-foreground uppercase">{t_agency("contact")}</Title>
            </div>
            <div className="p-6 space-y-4 md:space-y-8">
              <dl>
                <dt className="font-medium">Phone Number</dt>
                <dd className="flex items-center gap-1 text-foreground/60">
                  <TelephoneIcon fill="currentColor" size={18} />
                  <span>{agency.phonenumber ? agency.phonenumber: "-"}</span>
                </dd>
              </dl>
              <dl>
                <dt className="font-medium">Email Address</dt>
                <dd className="flex items-center gap-1 text-foreground/60">
                  <EnvelopIcon fill="currentColor" size={18} />
                  <span>{agency.email ? agency.email: "-"}</span>
                </dd>
              </dl>
              <dl>
                <dt className="font-medium">Home Address</dt>
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
              <Title className="font-medium text-foreground uppercase">{t_agency("openingdays")}</Title>
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
                <Button
                  isIconOnly
                  endContent={<PencilSquareIcon fill="currentColor" size={14} />}
                  size="sm" variant="solid" color="primary"
                  onClick={() => setShowEditModal(true)}
                />
              </div>
              {agency.created_by ? (
                <p className="mt-1 font-light text-tiny"> {t_agency("created_by")}:
                  <Link href={`/${locale}/admin/staff/${agency.created_by.id}`} className="font-medium ms-2">
                    {agency.created_by.firstname && agency.created_by.lastname ?
                      getUsername(agency.created_by.lastname, agency.created_by.firstname)
                    : ""}
                  </Link>
                </p>
              ): null }
              {agency.created_at? (
                <p className="mt-1 font-light text-tiny">{t_agency("at")}: {agency.created_at}</p>
              ): ""}
              <div className="flex items-center gap-2">
                <div
                  className={`my-3 inline-block rounded px-1.5 py-0.5 uppercase font-bold text-sm text-white
                  ${agency.status == "active"? "bg-success" :"bg-danger"}`}
                >{agency.status}</div>
                <div>
                  {agency.status == 'suspended' && agency.suspended_by ? (
                    <p className="mt-1 font-light text-tiny"> {t_agency("suspended_by")}:
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
              title={t_agency("administrators")}
            >
              {agency.administrators.length > 0 ? (
                <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                  <DefaultUserTable columns={columnsTabsStaff} users={agency.administrators} />
                </div>
              ): (
                <div className="mt-2 px-3 py-5">
                  <Alert color="default" message={t_alert("no_administrator")} />
                </div>
              )}
            </Tab>
            <Tab key="ressources" title={t_agency("ressources")}>
              {ressources.length > 0 ? (
                <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                  <DefaultRessourceTable columns={columnsStaffRessource} ressources={ressources} />
                </div>
              ): (
                <div className="mt-2 px-3 py-5">
                  <Alert color="default" message={t_alert("no_ressource")} />
                </div>
              )}
            </Tab>
            <Tab key="reservations" title={t_agency("reservations")}>
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
      <div className="col-span-12 my-8 md:mb-8">
        <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default py-8 antialiased">
          <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam i
            llum tempore blanditiis reiciendis perferendis sed consectetur architecto natus nemo omnis veritatis t
            otam fugiat expedita voluptatibus necessitatibus, doloribus tenetur vero. Repellat.
          </div>
        </div>
      </div>
    </div>












      <section className="overflow-hidden rounded-sm border border-divider bg-background shadow-default py-8 antialiased md:py-8">
        <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
          <div className="rounded-lg border border-divider bg-content1 p-4 md:p-8">
            <h3 className="mb-4 text-xl font-semibold">Latest orders</h3>
            <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-foreground/60">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold">
                  <a href="#" className="hover:underline">#FWB12546798</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold">11.12.2023</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold">$499</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
                  </svg>
                  In transit
                </dd>
              </dl>

              <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                <button
                  id="actionsMenuDropdownModal10"
                  data-dropdown-toggle="dropdownOrderModal10"
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                >
                  Actions
                  <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal10" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown10">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                        </svg>
                        <span>Order again</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        Order details
                      </a>
                    </li>
                    <li>
                      <a href="#" data-modal-target="deleteOrderModal" data-modal-toggle="deleteOrderModal" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
                        </svg>
                        Cancel order
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 dark:border-gray-700 md:py-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-foreground/60">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold">
                  <a href="#" className="hover:underline">#FWB12546777</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold">10.11.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold">$3,287</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
                  </svg>
                  Cancelled
                </dd>
              </dl>

              <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                <button
                  id="actionsMenuDropdownModal11"
                  data-dropdown-toggle="dropdownOrderModal11"
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                >
                  Actions
                  <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal11" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown11">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                        </svg>
                        <span>Order again</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        Order details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 py-4 pb-4 dark:border-gray-700 md:py-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-foreground/60">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold">
                  <a href="#" className="hover:underline">#FWB12546846</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold">07.11.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold">$111</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
                  </svg>
                  Completed
                </dd>
              </dl>

              <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                <button
                  id="actionsMenuDropdownModal12"
                  data-dropdown-toggle="dropdownOrderModal12"
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                >
                  Actions
                  <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal12" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown12">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                        </svg>
                        <span>Order again</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        Order details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-y-4 pt-4 md:pt-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-foreground/60">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold">
                  <a href="#" className="hover:underline">#FWB12546212</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold">18.10.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold">$756</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
                  </svg>
                  Completed
                </dd>
              </dl>

              <div className="w-full sm:flex sm:w-32 sm:items-center sm:justify-end sm:gap-4">
                <button
                  id="actionsMenuDropdownModal13"
                  data-dropdown-toggle="dropdownOrderModal13"
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 md:w-auto"
                >
                  Actions
                  <svg className="-me-0.5 ms-1.5 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal13" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown13">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
                        </svg>
                        <span>Order again</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"></path>
                          <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        </svg>
                        Order details
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>






      <div>
        <Modal
          open={showEditModal} close={() => setShowEditModal(false)}
          title={`${t_table("editAgency")} "${agency? agency.name: ""}"`}
        >
          <EditAgency agency={agency} />
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