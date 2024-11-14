"use client"

import React, { useEffect, useState } from "react";
import { Button, Input, Textarea, TimeInput } from "@nextui-org/react";
import { EnvelopIcon, TelephoneIcon, LocalisationIcon, UserIcon, ClockIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { AgencyType, AgencyFormType } from "@/lib/definitions";
import { getOpeningdays } from "@/lib/action/openingdays";
import Title from "@/components/Title";
import { capitalize } from "@/lib/utils";
import { Time } from "@internationalized/date";


export default function EditAgency({ agency }: { agency: AgencyType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const [openingdays, setOpeningdays] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOpeningdays()
      .then(response => {
        setOpeningdays(response);
        // setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const schema: ZodType<AgencyFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }),
      email: z.string().email({
        message:  t_error("email"),
      }),
      phonenumber: z.string(),
      address: z.string(),
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

  const handleFormSubmit = async (data: AgencyFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateAgency(data, agency.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("update_account_success_msg"));
          window.location.reload();
        }, 500);
      } else {
        const status = res.status;
        switch (status) {
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
        action="#" className="space-y-4 mt-4"
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
          variant="bordered"
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
          variant="bordered"
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
          variant="bordered"
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
          variant="bordered"
          {...register("address")}
          isInvalid={errors.address ? true: false}
          errorMessage={errors.address ? errors.address?.message: null}
          defaultValue={agency.address? agency.address: ""}
        />
        <div>
          <Title className="text-xl">{t("openingdays")}</Title>
          <div className="p-4">
            {agency.openingdays.map((item) => (
              <div key={item.id} className="flex items-center gap-6">
                <p className="font-semibold">{capitalize(locale === "en" ? item.name_en: item.name_fr)}</p>
                <div>
                  <TimeInput 
                    // label="Heure de debut" labelPlacement="inside" 
                    color="default"
                    hourCycle={24}
                    defaultValue={new Time(8)}
                    endContent={<ClockIcon fill="currentColor" size={18} />}
                    className="w-32 rounded-small" radius="sm"
                  />
                </div>
                <div>
                  <TimeInput 
                    label="Heure de debut" labelPlacement="inside" color="primary"
                    hourCycle={24}
                    // defaultValue={item.to}
                    endContent={<ClockIcon fill="currentColor" size={18} />}
                    className="w-32 md:w-36 rounded-small" radius="sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {JSON.stringify(agency.openingdays)}
          <div className="p-6">
            {JSON.stringify(openingdays)}
          </div>
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

