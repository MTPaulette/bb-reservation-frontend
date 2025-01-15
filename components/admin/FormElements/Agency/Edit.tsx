"use client"

import React, { useEffect, useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { EnvelopIcon, TelephoneIcon, LocalisationIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { AgencyType, AgencyFormType, HorairesType } from "@/lib/definitions";
import { getOpeningdays } from "@/lib/action/admin/openingdays";
import Title from "@/components/Title";
import { capitalize } from "@/lib/utils";
import { Hours } from "@/lib/data";
import { updateAgency } from "@/lib/action/admin/agencies";
import { signOut } from "next-auth/react";


export default function EditAgency({ agency }: { agency: AgencyType}) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const [openingdays, setOpeningdays] = useState([]);

  useEffect(() => {
    getOpeningdays()
      .then(response => {
        setOpeningdays(response);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const schema: ZodType<AgencyFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }).max(250),
      email: z.string().email({
        message:  t_error("email"),
      }).max(250),
      phonenumber: z.string().max(250),
      address: z.string().max(250),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgencyFormType>({
    resolver: zodResolver(schema),
  })

  const [horaires, setHoraires] = useState<HorairesType>({
    monday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[0]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[0]?.to: '18:00'
    },
    tuesday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[1]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[1]?.to: '18:00'
    },
    wednesday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[2]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[2]?.to: '18:00'
    },
    thursday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[3]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[3]?.to: '18:00'
    },
    friday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[4]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[4]?.to: '18:00'
    },
    saturday: {
      from: agency.openingdays.length > 0 ? agency.openingdays[5]?.from: '08:00',
      to: agency.openingdays.length > 0 ? agency.openingdays[5]?.to: '18:00'
    },
    // dimanche: { from: '10:00', to: '16:00' },
  });
  
  const handleSelectionChange = (day, type, hour) => {
    setHoraires((prevHoraires) => ({
      ...prevHoraires,
      [day]: { ...prevHoraires[day], [type]: hour },
    }));
  };

  const handleFormSubmit = async (data: AgencyFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateAgency(data, agency.id, horaires)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("update_account_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 401:
            setError(t_error("unauthenticated"));
            setTimeout(async () => {
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
            }, 500);
            break;
          case 404:
            setError(t_error("agency_not_found"));
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
      <form
        action="#" className="space-y-10 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          isRequired
          autoFocus
          endContent={
            <UserIcon fill="currentColor" size={18} />
          }
          label={t("name")}
          type="text"
          placeholder={t("name_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("name")}
          isInvalid={errors.name ? true: false}
          errorMessage={errors.name ? errors.name?.message: null}
          defaultValue={agency.name? agency.name: ""}
        />
        <Input
          endContent={
            <EnvelopIcon fill="currentColor" size={18} />
          }
          label={t("email")}
          type="email"
          placeholder={t("email_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("email")}
          isInvalid={errors.email ? true: false}
          errorMessage={errors.email ? errors.email?.message: null}
          defaultValue={agency.email? agency.email: ""}
        />
        <Input
          endContent={
            <TelephoneIcon fill="currentColor" size={18} />
          }
          label={t("phonenumber")}
          type="text"
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          placeholder={t("phonenumber_placeholder")}
          {...register("phonenumber")}
          isInvalid={errors.phonenumber ? true: false}
          errorMessage={errors.phonenumber ? errors.phonenumber?.message: null}
          defaultValue={agency.phonenumber? agency.phonenumber: ""}
        />
        <Textarea
          endContent={
            <LocalisationIcon fill="currentColor" size={18} />
          }
          label={t("address")}
          placeholder={t("address_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("address")}
          isInvalid={errors.address ? true: false}
          errorMessage={errors.address ? errors.address?.message: null}
          defaultValue={agency.address? agency.address: ""}
        />

        <Title className="text-xl">{t("openingdays")}</Title>
        <div className="py-4 px-10">
        {openingdays.map((day) => (
          <div key={day.id} className="flex items-center gap-6">
            <p className="font-medium min-w-24 mb-1">{capitalize(locale === "en" ? day.name_en: day.name_fr)}</p>
            <div>
              <label className="text-sm mr-4">{t("from")}</label>
              <select
                value={horaires[day.name_en.toLowerCase()].from}
                onChange={(e) => handleSelectionChange(day.name_en.toLowerCase(), 'from', e.target.value)}
                className="!border-none"
              >
                {Hours.map((hour) => (
                  <option key={hour.id} value={hour.hour}>
                    {hour.hour}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm mr-4">{t("to")}</label>
              <select
                value={horaires[day.name_en.toLowerCase()].to}
                onChange={(e) => handleSelectionChange(day.name_en.toLowerCase(), 'to', e.target.value)}
                className="!border-none"
              >
                {Hours.map((hour) => (
                  <option key={hour.id} value={hour.hour}>
                    {hour.hour}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        </div>

        <div className="w-full">
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
    </>
  )
}

