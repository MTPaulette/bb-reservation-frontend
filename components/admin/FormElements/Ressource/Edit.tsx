"use client"

import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { AgencyType, RessourceFormType, RessourceType, SpaceType } from "@/lib/definitions";
import { updateRessource } from "@/lib/action/ressources";
import { getAgencies } from "@/lib/action/agencies";
import { getSpaces } from "@/lib/action/spaces";
import Title from "@/components/Title";
import Loader from "../../Common/Loader";

export default function EditRessource({ ressource }: { ressource: RessourceType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [agencies, setAgencies] = useState<AgencyType>();
  const [spaces, setSpaces] = useState<SpaceType>();

  const schema: ZodType<RessourceFormType> = z
    .object({
      space_id: z.string(),
      agency_id: z.string(),
      quantity: z.string().min(1),
      price_hour: z.string().min(1),
      price_midday: z.string().min(1),
      price_day: z.string().min(1),
      price_week: z.string().min(1),
      price_month: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RessourceFormType>({
    resolver: zodResolver(schema),
  })
  
  useEffect(() => {
    getAgencies()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setAgencies(await res.json());
        }
    });
    getSpaces()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setSpaces(await res.json());
        }
    });
  }, []);

  const handleFormSubmit = async (data: RessourceFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateRessource(data, ressource.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("update_ressource_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("ressource_not_found"));
            break;
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


  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
      {success != "" ? (
        <Alert color="success" message={success} />
      ) : null}
      {spaces && agencies ? (
      <form
        action="#" className="space-y-4 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Select
          isRequired
          label={t("space")}
          variant="bordered"
          placeholder={t("space_placeholder")}
          isInvalid={errors.space_id ? true: false}
          errorMessage={errors.space_id ? errors.space_id?.message: null}
          className="w-full bg-background rounded-small"
          defaultSelectedKeys={[ressource.space_id.toString()]}
          {...register("space_id")}
        >
          {spaces.map((space) => (
            <SelectItem key={space.id}>
              {space.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          label={t("agency")}
          variant="bordered"
          placeholder={t("agency_placeholder")}
          isInvalid={errors.agency_id ? true: false}
          errorMessage={errors.agency_id ? errors.agency_id?.message: null}
          className="w-full bg-background rounded-small"
          defaultSelectedKeys={[ressource.agency_id.toString()]}
          {...register("agency_id")}
        >
          {agencies.map((agency) => (
            <SelectItem key={agency.id}>
              {agency.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          label={t("quantity")}
          type="number"
          placeholder={t("quantity_placeholder")}
          variant="bordered"
          {...register("quantity")}
          isInvalid={errors.quantity ? true: false}
          errorMessage={errors.quantity ? errors.quantity?.message: null}
          defaultValue={ressource.quantity? ressource.quantity: ""}
        />
        <Title className="my-4 text-lg">{t("prices")} (XAF)</Title>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full px-3 sm:px-6">
          <Input
            isRequired
            label={t("price_hour")}
            type="number"
            variant="bordered"
            size="sm"
            className="w-full col-span-1"
            {...register("price_hour")}
            isInvalid={errors.price_hour ? true: false}
            errorMessage={errors.price_hour ? errors.price_hour?.message: null}
            defaultValue={ressource.price_hour? ressource.price_hour: ""}
          />
          <Input
            isRequired
            label={t("price_midday")}
            type="number"
            variant="bordered"
            size="sm"
            className="w-full col-span-1 whitespace-nowrap"
            {...register("price_midday")}
            isInvalid={errors.price_midday ? true: false}
            errorMessage={errors.price_midday ? errors.price_midday?.message: null}
            defaultValue={ressource.price_midday? ressource.price_midday: ""}
          />
          <Input
            isRequired
            label={t("price_day")}
            type="number"
            variant="bordered"
            size="sm"
            className="w-full col-span-1"
            {...register("price_day")}
            isInvalid={errors.price_day ? true: false}
            errorMessage={errors.price_day ? errors.price_day?.message: null}
            defaultValue={ressource.price_day? ressource.price_day: ""}
          />
          <Input
            isRequired
            label={t("price_week")}
            type="number"
            variant="bordered"
            size="sm"
            className="w-full col-span-1"
            {...register("price_week")}
            isInvalid={errors.price_week ? true: false}
            errorMessage={errors.price_week ? errors.price_week?.message: null}
            defaultValue={ressource.price_week? ressource.price_week: ""}
          />
          <Input
            isRequired
            label={t("price_month")}
            type="number"
            variant="bordered"
            size="sm"
            className="w-full col-span-1"
            {...register("price_month")}
            isInvalid={errors.price_month ? true: false}
            errorMessage={errors.price_month ? errors.price_month?.message: null}
            defaultValue={ressource.price_month? ressource.price_month: ""}
          />
        </div>
        <div className="w-full mt-8">
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
      ) : (
        <Loader />
      )}
    </div>
    </>
  )
}
