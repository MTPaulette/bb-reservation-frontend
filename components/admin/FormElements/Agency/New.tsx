"use client"

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { EnvelopIcon, LocalisationIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { AgencyFormType } from "@/lib/definitions";
import { createAgency } from "@/lib/action/admin/agencies";
import { signOut } from "next-auth/react";

export default function NewAgency() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<AgencyFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }).max(250),
      email: z.string().email({
        message:  t_error("email"),
      }).max(250),
      phonenumber: z.string().min(1).max(250),
      address: z.string().min(1).max(250),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AgencyFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: AgencyFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createAgency(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("new_account_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
        action="#" className="space-y-10 mt-8 md:mt-10"
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
        />
        <Input
          isRequired
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
        />
        <Input
          isRequired
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
        />
        <Textarea
          isRequired
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
        />
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

