"use client"

import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem, User, Tabs, Tab } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { UserType, ReservationFormType, RessourceType } from "@/lib/definitions";
import { createRessource } from "@/lib/action/ressources";
import { getClients } from "@/lib/action/clients";
import { getRessources } from "@/lib/action/ressources";
import Title from "@/components/Title";
import Loader from "../../Common/Loader";
import { signOut } from 'next-auth/react';
import { capitalize, getImageUrl } from "@/lib/utils";
import { CalendarIcon, CurrencyIcon } from "@/components/Icons";

export default function NewReservation() {
  const t = useTranslations("Input");
  const t_tabs = useTranslations("Tabs");
  const t_error = useTranslations("InputError");
  const locale = useLocale();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [clients, setClients] = useState<UserType>();
  const [ressources, setRessources] = useState<RessourceType>();
  const [reservation_id, setReservation_id] = useState<number>();

  const schema: ZodType<ReservationFormType> = z
    .object({
      client_id: z.string().min(1),
      ressource_id: z.string().min(1),
      validity: z.string().min(1),
      start_date: z.string().min(1),
      start_hour: z.string().min(1),
      quantity: z.string().min(1),
      coupon: z.string(),
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
        setLoading(false);
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
        setLoading(false);
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
    setLoading(true);
    createRessource(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("new_ressource_success_msg"));
          window.location.reload();
        }, 500);
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

  const handleSelectionClientChange = (value) => {
    console.log('=============value=========');
    console.log(value);
  }

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
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="newReservation" 
          color="primary" 
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-success",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-success"
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
            <div>
              <Title className="text-xl sm:text-2xl my-4 md:my-6">{t_tabs("newReservation")}</Title>
              <form
                action="#" className="space-y-4"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div className="grid grid-cols-12 md:gap-8">
                  <div className="col-span-12 md:col-span-8 space-y-4">
                    <Select
                      isRequired
                      label={t("client")}
                      variant="bordered"
                      placeholder={t("client_placeholder")}
                      isInvalid={errors.client_id ? true: false}
                      errorMessage={errors.client_id ? errors.client_id?.message: null}
                      className="w-full bg-background rounded-small"
                      {...register("client_id")}
                      onChange={(e) => {
                        handleSelectionClientChange(e.target.value);
                      }}
                    >
                      {clients.map((client) => (
                        <SelectItem key={client.id}>
                          {/* {getUsername(client.lastname, client.firstname)} */}
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
                      ))}
                    </Select>
                    <Select
                      isRequired
                      label={t("ressource")}
                      variant="bordered"
                      placeholder={t("ressource_placeholder")}
                      isInvalid={errors.ressource_id ? true: false}
                      errorMessage={errors.ressource_id ? errors.ressource_id?.message: null}
                      className="w-full bg-background rounded-small"
                      {...register("ressource_id")}
                    >
                      {ressources.map((ressource) => (
                        <SelectItem key={ressource.id}>
                          {capitalize(ressource.space)}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-12 md:col-span-4 mt-6 md:mt-0">
                    <div className="rounded-md px-5 pt-4 pb-7 bg-content2">
                      <Title className="text-lg mb-4">{t_tabs("define_time_slot")}</Title>
                      <Input
                        isRequired
                        label={t("quantity")}
                        type="number"
                        placeholder={t("quantity_placeholder")}
                        variant="bordered"
                        {...register("quantity")}
                        isInvalid={errors.quantity ? true: false}
                        errorMessage={errors.quantity ? errors.quantity?.message: null}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-4 md:mt-8">
                  <Button 
                    type="submit"
                    color="primary"
                    isLoading={loading}
                    className="w-full"
                  >
                    {t("save")}
                  </Button>
                </div>
              </form>
            </div>
          </Tab>
          <Tab
            isDisabled={!reservation_id? true: false}
            key="payment"
            title={
              <div className="flex items-center space-x-2">
                <CurrencyIcon fill="currentColor" size={18} />
                <span>{t_tabs("payment")}</span>
              </div>
            }
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
            vero rem, dolores in delectus ut incidunt a inventore perferendis
            pariatur dignissimos labore voluptates obcaecati laborum commodi nostrum, ad, minima aspernatur.
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
