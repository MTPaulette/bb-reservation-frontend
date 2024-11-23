"use client"

import React from "react";
import { getAgencyById } from '@/lib/action/agencies';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize } from "@/lib/utils";

import { PencilSquareIcon } from "@/components/Icons";
import { Button } from "@nextui-org/react";

import Modal from "@/components/Modal";
import EditAgency from "@/components/admin/FormElements/Agency/Edit";
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import CardWrapper from "@/components/admin/DataStats/Card2";

export default function ViewAgency({id}: {id: string}) {
  const [agency, setAgency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  // const t_space = useTranslations("Space");

  useEffect(() => {
    setError("");
    getAgencyById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setAgency(response);
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
      ) : null}
    </div>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div>
      <section className="overflow-hidden rounded-sm border border-divider bg-background shadow-default py-8 antialiased md:py-8">
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
            <p className="text-foreground/60 text-justify my-4">
              {/* {locale === "en" ? agency.space.description_en: agency.space.description_fr} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris
              tempus ut. Donec fermentum blandit aliquet. Etiam dictum
              dapibus ultricies. Sed vel aliquet libero. Nunc a augue
              fermentum, pharetra ligula sed, aliquam lacus.
            </p>
            {/*
            <ul className="flex flex-wrap -ml-4 gap-y-2">
              {agency.space.characteristics.map((item) => (
                <li key={item.id} className="border-r border-divider px-4">
                  {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                </li>
              ))}
            </ul> */}
          </div>

          {/* agency */}
          <div className="py-4 md:py-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <div className="space-y-4">
                  {/* <div> */}
                <div className="flex space-x-4">
                  <span>Status: </span>
                    <span
                      className={`mb-2 inline-block rounded px-2.5 py-0.5 uppercase font-bold
                      ${agency.status == "active"? "bg-success text-white" :
                      "text-danger-800 dark:bg-danger-900 dark:text-danger-300"}`}
                    >{agency.status}</span>
                  </div>
                    { agency.status == "active" ? (
                      <p className="text-foreground/60 text-justify my-4">
                        {locale === "en" ? agency.reason_for_suspension_en: agency.reason_for_suspension_fr}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Pellentesque posuere fermentum urna, eu condimentum mauris
                        tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                        dapibus ultricies. Sed vel aliquet libero. Nunc a augue
                        fermentum, pharetra ligula sed, aliquam lacus.
                      </p>
                    ): null}
                {/* </div> */}
                <dl>
                  <dt className="font-semibold text-foreground">Phone Number</dt>
                  <dd className="text-foreground/60">{agency.phonenumber ? agency.phonenumber: "-"}</dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-foreground">Email Address</dt>
                  <dd className="text-foreground/60">{agency.email ? agency.email: "-"}</dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-foreground">Home Address</dt>
                  <dd className="text-foreground/60">{agency.address ? agency.address: "-"}</dd>
                </dl>
              </div>
              <div className="space-y-4">
                <dl>
                  <dt className="font-semibold text-foreground">Favorite pick-up point</dt>
          
                  {agency.openingdays.length > 0 ? (
                  <div className="text-sm">
                    {agency.openingdays.map((item) => (
                      <div key={item.id}>
                        <span className="font-semibold mr-1.5">{capitalize(locale === "en" ? item.name_en: item.name_fr)}</span>
                        <span className="font-light text-xs">{`(${item.from} - ${item.to})`}</span>
                      </div>
                    ))}
                  </div>
                    ) : null}
                  <dd className="flex items-center gap-1 text-foreground/60">
                    <svg className="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                      />
                    </svg>
                    Herald Square, 2, New York, United States of America
                  </dd>
                </dl>
                <dl>
                  <dt className="font-semibold text-foreground">My Companies</dt>
                  <dd className="text-foreground/60">FLOWBITE LLC, Fiscal code: 18673557</dd>
                </dl>
                <dl>
                  <dt className="mb-1 font-semibold text-foreground">Payment Methods</dt>
                  <dd className="flex items-center space-x-4 text-foreground/60">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      <img className="h-4 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                      <img className="hidden h-4 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                    </div>
                    <div>
                      <div className="text-sm">
                        <p className="mb-0.5 font-medium text-foreground">Visa ending in 7658</p>
                        <p className="font-normal text-foreground/60">Expiry 10/2024</p>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <Button
              endContent={<PencilSquareIcon fill="currentColor" size={14} />}
              size="md" variant="solid" color="primary"
              onClick={() => setShowEditModal(true)}
            > {t_table("edit")}</Button>
          </div>

          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-3 gap-x-6 gap-y-10 border-b border-t border-divider py-4 md:py-8 xl:gap-16">
            <CardWrapper />
          </div>

          {/* images
          <div className="border-b border-divider py-4 md:py-8">
            {agency.space.images.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-6 w-full">
                {agency.space.images.map((item) => (
                  <Image
                    key={item.id}
                    width="100%"
                    alt="agency image"
                    className="w-auto object-cover h-[100px] lg:h-[140px] z-1 "
                    src={getImageUrl(item.src)}
                  />
                ))}
              </div>
            ) : null}
          </div> */}
          <div className="rounded-lg border border-divider bg-content1 p-4 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-foreground">Latest orders</h3>
            <div className="flex flex-wrap items-center gap-y-4 border-b border-gray-200 pb-4 dark:border-gray-700 md:pb-5">
              <dl className="w-1/2 sm:w-48">
                <dt className="text-base font-medium text-foreground/60">Order ID:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">
                  <a href="#" className="hover:underline">#FWB12546798</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">11.12.2023</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">$499</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="me-2 mt-1.5 inline-flex shrink-0 items-center rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal10" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown10">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
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
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"></path>
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
                <dd className="mt-1.5 text-base font-semibold text-foreground">
                  <a href="#" className="hover:underline">#FWB12546777</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">10.11.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">$3,287</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"></path>
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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal11" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown11">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
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
                <dd className="mt-1.5 text-base font-semibold text-foreground">
                  <a href="#" className="hover:underline">#FWB12546846</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">07.11.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">$111</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal12" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown12">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
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
                <dd className="mt-1.5 text-base font-semibold text-foreground">
                  <a href="#" className="hover:underline">#FWB12546212</a>
                </dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Date:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">18.10.2024</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/5 md:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Price:</dt>
                <dd className="mt-1.5 text-base font-semibold text-foreground">$756</dd>
              </dl>

              <dl className="w-1/2 sm:w-1/4 sm:flex-1 lg:w-auto">
                <dt className="text-base font-medium text-foreground/60">Status:</dt>
                <dd className="mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"></path>
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
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"></path>
                  </svg>
                </button>
                <div id="dropdownOrderModal13" className="z-10 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                  <ul className="p-2 text-left text-sm font-medium text-foreground/60" aria-labelledby="actionsMenuDropdown13">
                    <li>
                      <a href="#" className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="me-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"></path>
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
  )
}