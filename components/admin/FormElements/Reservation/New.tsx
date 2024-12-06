"use client"

import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem, SelectedItems, User, Tabs, Tab, Image, Chip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { UserType, ReservationFormType, RessourceType } from "@/lib/definitions";
import { getRessourceById } from "@/lib/action/ressources";
import { getClients } from "@/lib/action/clients";
import { getRessources } from "@/lib/action/ressources";
import Title from "@/components/Title";
import Loader from "../../Common/Loader";
import { signOut } from 'next-auth/react';
import { capitalize, formatCurrency, getImageUrl } from "@/lib/utils";
import { CalendarIcon, CurrencyIcon } from "@/components/Icons";
import { createReservation } from "@/lib/action/reservations";
import { validitiesName as validities, Hours, middayPeriods } from "@/lib/data";
import { applyCoupon } from "@/lib/action/coupons";
import NewPayment from "../Payment/New";
// import Image from "next/image";

export default function NewReservation() {
  const t_input = useTranslations("Input");
  const t_tabs = useTranslations("Tabs");
  const t_ressource = useTranslations("Ressource");
  const t_error = useTranslations("InputError");
  const locale = useLocale();
  const [loading, setLoading] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [clients, setClients] = useState<UserType>();
  const [ressources, setRessources] = useState<RessourceType>();
  const [reservation_id, setReservation_id] = useState<number>();
  const [selectedRessource, setSelectedRessource] = useState();
  const [selectedClient_id, setSelectedClient_id] = useState<string|number>("");
  const [coupon, setCoupon] = useState<string>("");
  const [selectedValidity, setSelectedValidity] = useState<string>("");
  const [errorCoupon, setErrorCoupon] = useState<string>("");
  const [validCoupon, setValidCoupon] = useState<string>("");
  const [clientNotFound, setClientNotFound] = useState<string>("");
  const [loadingCoupon, setLoadingCoupon] = useState<boolean>(false);

  const schema: ZodType<ReservationFormType> = z
    .object({
      client_id: z.string(),
      ressource_id: z.string(),
      validity: z.string().min(1),
      midday_period: z.string().min(1),
      start_date: z.string().min(1),
      start_hour: z.string().min(1),
      quantity: z.string().min(1),
      // coupon: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormType>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    getClients()
      .then(async (res) => {
        // setLoading(false);
        if(res?.ok){
          setClients(await res.json());
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
    getRessources()
      .then(async (res) => {
        // setLoading(false);
        if(res?.ok){
          setRessources(await res.json());
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

  const handleFormSubmit = async (data: ReservationFormType) => {
    setError("");
    setSuccess("");
    setSave(true);
    createReservation(data)
    .then(async (res) => {
      setSave(false);
      if(res?.ok) {
        setSuccess(t_input("new_ressource_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 422:
            const err = await res.json();
            setError(JSON.stringify(err.errors));
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  }

  const getSelectedRessource = (id: string) => {
    setError("");
    getRessourceById(Number(id))
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          const response = await res.json();
          setSelectedRessource(response.ressource);
          // setReservations(response.reservations);
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
  }

  const handleApplyCoupon = () => {
    if(coupon && selectedClient_id) {
      setErrorCoupon("");
      setClientNotFound("");
      setLoadingCoupon(true);
      applyCoupon(coupon, Number(selectedClient_id))
        .then(async (res) => {
          setLoadingCoupon(false);
          if(res?.ok){
            const response = await res.json();
            setValidCoupon(response.coupon);
          }else {
            const status = res.status;
            const errors = await res.json();
            switch(status) {
              case 401:
                setErrorCoupon(t_error("unauthenticated"));
                await signOut({
                  callbackUrl: `/${locale}/auth/login`
                });
                break;
              case 403:
                setErrorCoupon(t_error("acces_denied"));
                break;
              case 404:
                if(errors.errors.en == "client not found") {
                  setClientNotFound(locale === "en" ? errors.errors.en : errors.errors.fr);
                } else {
                  setErrorCoupon(locale === "en" ? errors.errors.en : errors.errors.fr);
                }
                break;
              case 500:
                setErrorCoupon(locale === "en" ? errors.errors.en : errors.errors.fr);
                break;
              default:
                break;
            }
          }
        })
        .catch(error => {
          setErrorCoupon(t_error("something_wrong"));
          console.error(error);
        });
    }
  }

  const classNames = React.useMemo(
    () => ({
      inputWrapper: [
        "bg-background",
        "!cursor-text",
      ],
    }),[],
  );

  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
      {success != "" ? (
        <Alert color="success" message={success} />
      ) : null}
      {ressources && clients ? (
      <div className="flex w-full flex-col -mt-4">
        <Tabs
          aria-label="newReservation"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-success",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-success font-bold text-base"
          }}
        >
          <Tab
            key="reservations"
            title={
              <div className="flex items-center space-x-2">
                <CalendarIcon fill="none" size={18} />
                <span>{t_tabs("reservations")}</span>
              </div>
            }
          >
            <div className="mt-4 md:mt-6">
            {JSON.stringify(validCoupon)}
              {/* <Title className="text-xl sm:text-2xl my-4 md:my-6">{t_tabs("newReservation")}</Title> */}
              <form
                action="#" className="space-y-4"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div className="grid grid-cols-12 sm:gap-6 md:gap-8">
                  <div className="col-span-12 sm:col-span-7 space-y-12">
                    <Select
                      items={clients}
                      isRequired
                      label={t_input("client")}
                      labelPlacement="outside"
                      variant="flat"
                      classNames={{
                        base: "w-full",
                        label: "pb-2",
                        trigger: "h-12",
                      }}
                      placeholder={t_input("client_placeholder")}
                      isInvalid={errors.client_id || clientNotFound != '' ? true: false}
                      errorMessage={errors.client_id || clientNotFound != '' ? errors.client_id?.message || clientNotFound : null}
                      className="w-full bg-background rounded-small"
                      {...register("client_id")}
                      renderValue={(items: SelectedItems<UserType>) => {
                        return items.map((item) => (
                          <div key={item.key} className="flex items-center gap-2">
                            <User
                              avatarProps={
                                {radius: "full", size: "sm", src: item.data.image? getImageUrl(item.data.image) : "" }
                              }
                              classNames={{
                                name: "font-semibold",
                              }}
                              description={item.data.firstname}
                              name={item.data.lastname}
                            />
                          </div>
                        ));
                      }}
                      onChange={(e) => {
                        setSelectedClient_id(e.target.value);
                        setClientNotFound('');
                      }}
                    >
                      {(client) => (
                        <SelectItem key={client.id} textValue={client.lastname}>
                          <User
                            avatarProps={
                              {radius: "full", size: "sm", src: client.image? getImageUrl(client.image) : "" }
                            }
                            classNames={{
                              name: "font-semibold",
                            }}
                            description={client.firstname}
                            name={client.lastname}
                          />
                        </SelectItem>
                      )}
                    </Select>
                    <Select
                      isRequired
                      label={t_input("ressource")}
                      labelPlacement="outside"
                      variant="flat"
                      placeholder={t_input("ressource_placeholder")}
                      isInvalid={errors.ressource_id ? true: false}
                      errorMessage={errors.ressource_id ? errors.ressource_id?.message: null}
                      className="w-full bg-background rounded-small"
                      {...register("ressource_id")}
                      onChange={(e) => {
                        getSelectedRessource(e.target.value);
                      }}
                    >
                      {ressources.map((ressource) => (
                        <SelectItem key={ressource.id}>
                          {capitalize(ressource.space)}
                        </SelectItem>
                      ))}
                    </Select>
                    {/* ressource informations */}
                    {selectedRessource ? (
                    <div className="py-4 px-2">
                      {/* ressource name */}
                      <div>
                        <div className="mb-4 md:mb-6">
                          <Title className="text-2xl font-semibold sm:text-3xl">
                            {capitalize(selectedRessource.space.name)}
                          </Title>
                          {selectedRessource.agency ? (
                            <p className="mt-1 font-light text-tiny"> {t_ressource("from")}:
                              <span className="font-medium ms-2">
                                {selectedRessource.agency.name? capitalize(selectedRessource.agency.name): ""}
                              </span>
                            </p>
                          ): null }
                        </div>
                        <p className="text-foreground/60 text-justify mt-2">
                          {capitalize(locale === "en" ? selectedRessource.space.description_en: selectedRessource.space.description_fr)}
                        </p>
                        {selectedRessource.space && selectedRessource.space.images.length > 0 ? (
                        <>
                          <div className="mt-6">
                            <Image
                              isBlurred
                              isZoomed
                              src={getImageUrl(selectedRessource.space.images[0].src)}
                              alt="NextUI Album Cover"
                              className="relative"
                              classNames={{
                                img: ["w-full", "h-auto"]
                              }}
                            />
                          </div>
                          <div className="w-full mt-6 h-full flex flex-wrap gap-6 items-center justify-start">
                            {selectedRessource.space.images.map((item) => (
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
                        <div className="border-t-2 border-divider pt-4 sm:pt-12 mt-6 sm:mt-12">
                          <Title className="font-semibold text-xl text-foreground">{t_ressource("characteristics")}</Title>
                            {selectedRessource.space && selectedRessource.space.characteristics.length > 0 ? (
                            <ul className="w-full flex flex-wrap mt-6 gap-x-4 gap-y-4">
                              {selectedRessource.space.characteristics.map((item) => (
                                <li key={item.id}>
                                  <Chip color="default" size="md" variant="flat">
                                    {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                                  </Chip>
                                </li>
                              ))}
                            </ul>
                            ) : null}
                        </div>
                          {/* prices
                          <div className="rounded-sm border border-divider bg-background shadow-default min-w-45">
                            <div className="border-b border-divider px-7 py-4">
                              <Title className="font-medium text-foreground uppercase">{t_ressource("price")}</Title>
                            </div>
                            <div className="p-6 space-y-4 md:space-y-8">
                              <p>
                                {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
                                <span className="font-bold pl-2 text-sm">{selectedRessource.price_hour? formatCurrency(selectedRessource.price_hour) : ""}</span>
                              </p>
                              <p className="whitespace-nowrap">
                                {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
                                <span className="font-bold pl-2 text-sm">{selectedRessource.price_midday? formatCurrency(selectedRessource.price_midday) : ""}</span>
                              </p>
                              <p>
                                {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
                                <span className="font-bold pl-2 text-sm">{selectedRessource.price_day? formatCurrency(selectedRessource.price_day) : ""}</span>
                              </p>
                              <p>
                                {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
                                <span className="font-bold pl-2 text-sm">{selectedRessource.price_week? formatCurrency(selectedRessource.price_week) : ""}</span>
                              </p>
                              <p>
                                {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
                                <span className="font-bold pl-2 text-sm">{selectedRessource.price_month? formatCurrency(selectedRessource.price_month) : ""}</span>
                              </p>
                            </div>
                          </div> */}

                    </div>
                    ) : null}
                  </div>
                  <div className="col-span-12 sm:col-span-5 mt-6 md:mt-0">
                    <div className="rounded-md px-5 pt-4 pb-7 bg-content2 space-y-10">
                      <Title className="text-md mb-4">{t_tabs("define_time_slot")}</Title>
                      {/* validity */}
                      <Select
                        isRequired
                        label={t_input("validity")}
                        labelPlacement="outside"
                        size="sm"
                        variant="flat"
                        placeholder={t_input("validity_placeholder")}
                        isInvalid={errors.validity ? true: false}
                        errorMessage={errors.validity ? errors.validity?.message: null}
                        className="w-full bg-background rounded-small"
                        {...register("validity")}
                        onChange={(e) => {
                          setSelectedValidity(e.target.value);
                        }}
                      >
                        {validities.map((item) => (
                          <SelectItem key={item.uid}>
                            {locale === "en" ? item.name_en: item.name_fr}
                          </SelectItem>
                        ))}
                      </Select>

                      {/* midday periods */}
                      {selectedValidity == "midday" ? (
                      <Select
                        isRequired
                        label={t_input("midday_period")}
                        labelPlacement="outside"
                        size="sm"
                        variant="flat"
                        placeholder={t_input("midday_period_placeholder")}
                        isInvalid={errors.midday_period ? true: false}
                        errorMessage={errors.midday_period ? errors.midday_period?.message: null}
                        className="w-full bg-background rounded-small"
                        {...register("midday_period")}
                      >
                        {middayPeriods.map((item) => (
                          <SelectItem key={item.uid}>
                            {locale === "en" ? item.name_en: item.name_fr}
                          </SelectItem>
                        ))}
                      </Select>
                      ): null}

                      {/* quantity */}
                      <Input
                        isRequired
                        label={t_input("quantity")}
                        type="number"
                        placeholder={t_input("quantity_placeholder")}
                        labelPlacement="outside"
                        size="sm"
                        {...register("quantity")}
                        isInvalid={errors.quantity ? true: false}
                        errorMessage={errors.quantity ? errors.quantity?.message: null}
                        classNames={classNames}
                      />

                      {/* start date */}
                      <Input
                        isRequired
                        label={t_input("start_date")}
                        type="date"
                        labelPlacement="outside"
                        size="sm"
                        {...register("start_date")}
                        isInvalid={errors.start_date ? true: false}
                        errorMessage={errors.start_date ? errors.start_date?.message: null}
                        classNames={classNames}
                      />

                      {/* start hour */}
                      {selectedValidity == "hour" ? (
                      <Select
                        isRequired
                        label={t_input("start_hour")}
                        labelPlacement="outside"
                        size="sm"
                        variant="flat"
                        placeholder={t_input("start_hour_placeholder")}
                        isInvalid={errors.start_hour ? true: false}
                        errorMessage={errors.start_hour ? errors.start_hour?.message: null}
                        className="w-full bg-background rounded-small"
                        {...register("start_hour")}
                      >
                        {Hours.map((item) => (
                          <SelectItem key={item.id}>
                            {capitalize(item.hour)}
                          </SelectItem>
                        ))}
                      </Select>
                      ): null}

                      {/* coupon */}
                      {JSON.stringify(selectedClient_id)}
                      <Input
                        label={t_input("coupon_discount")}
                        type="text"
                        placeholder={t_input("coupon_apply_placeholder")}
                        labelPlacement="outside"
                        size="sm"
                        // {...register("coupon")}
                        isInvalid={errorCoupon || clientNotFound ? true: false}
                        errorMessage={errorCoupon ? errorCoupon || clientNotFound: null}
                        classNames={classNames}
                        endContent={
                          <Button
                            isDisabled={selectedClient_id == "" ? true : false}
                            isLoading={loadingCoupon}
                            type="button"
                            // className="bg-content4 text-foreground text-xs rounded-md px-3 pt-1 pb-1.5"
                            className="bg-content4 text-foreground text-xs rounded-md !max-h-6"
                            onClick={() =>{
                              handleApplyCoupon()
                            }}
                          >
                            {t_input("apply")}
                          </Button>
                        }
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <div className="w-full mt-4 md:mt-8">
                        <Button
                          type="submit"
                          color="primary"
                          isLoading={save}
                          className="w-full uppercase truncate fomt-medium"
                        >
                          {t_input("reserve")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </Tab>
          <Tab
            // isDisabled={reservation_id? false : true}
            key="payment"
            title={
              <div className="flex items-center space-x-2">
                <CurrencyIcon fill="currentColor" size={18} />
                <span>{t_tabs("payment")}</span>
              </div>
            }
          >
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Explicabo, autem ea! Officia ipsum quam sit molestiae?
             Temporibus similique aut pariatur laborum
            ullam quibusdam dolores vitae nihil incidunt mollitia! Illo, cup
            iditate. */}
            <NewPayment reservation_id={1} />
          </Tab>
        </Tabs>
      </div>
      ) : (
        <Loader />
      )}
    </div>
    </>
  )
}
