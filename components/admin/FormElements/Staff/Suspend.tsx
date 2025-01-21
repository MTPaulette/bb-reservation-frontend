"use client"

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { ConfirmPasswordType } from "@/lib/definitions";
import { suspendStaff } from "@/lib/action/admin/staff";
import Title from "@/components/Title";
import { signOut } from "next-auth/react";

export default function SuspendStaff({ id, status }: { id: number, status: string } ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<ConfirmPasswordType> = z
    .object({
      password: z.string().min(1),
      reason_for_suspension_en: z.string(),
      reason_for_suspension_fr: z.string(),
  });

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmPasswordType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: ConfirmPasswordType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    suspendStaff(data, id, status)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(status == 'active' ? t("suspend_account_success_msg"): t("cancel_suspension_account_success_msg"));
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
            setError(t_error("user_not_found"));
            break;
          case 422:
            const err = await res.json();
            setError(err.password? t_error("wrongPassword"): JSON.stringify(err))
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
      <Title className="text-base mt-4">{t_error("confirm_warning")}</Title>
      <form
        action="#" className="space-y-4 mt-8 md:mt-10"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          isRequired
          label={t("password")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          placeholder={t("password_placeholder")}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
              {isVisible ? (
                <EyeSlashIcon fill="currentColor" size={18} />
              ) : (
                <EyeIcon fill="currentColor" size={18} />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          {...register("password")}
          isInvalid={errors.password ? true: false}
          errorMessage={errors.password ? errors.password?.message: null}
        />

        {status == 'active' ? (
          <div className="flex flex-col gap-4">
            <Textarea
              isRequired
              label={t("reason_for_suspension_en")}
              placeholder={t("reason_for_suspension_placeholder")}
              labelPlacement="outside"
              classNames={{inputWrapper: "bg-input rounded-small"}}
              {...register("reason_for_suspension_en")}
              isInvalid={errors.reason_for_suspension_en ? true: false}
              errorMessage={errors.reason_for_suspension_en ? errors.reason_for_suspension_en?.message: null}
            />
            <Textarea
              isRequired
              label={t("reason_for_suspension_fr")}
              placeholder={t("reason_for_suspension_placeholder")}
              labelPlacement="outside"
              classNames={{inputWrapper: "bg-input rounded-small"}}
              {...register("reason_for_suspension_fr")}
              isInvalid={errors.reason_for_suspension_fr ? true: false}
              errorMessage={errors.reason_for_suspension_fr ? errors.reason_for_suspension_fr?.message: null}
            />
          </div>
        ) : 
        <div className={`${status == 'active'? 'block': 'hidden'}`}>
          <Textarea
            isRequired
            label={t("reason_for_suspension_en")}
            placeholder={t("reason_for_suspension_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            defaultValue=""
            {...register("reason_for_suspension_en")}
          />
          <Textarea
            isRequired
            label={t("reason_for_suspension_fr")}
            placeholder={t("reason_for_suspension_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            defaultValue=""
            {...register("reason_for_suspension_fr")}
          />
        </div>}

        <div className="w-full">
          <Button 
            type="submit"
            color="danger"
            isLoading={loading}
            className="w-full"
          >
            {t("confirm")}
          </Button>
        </div>
      </form>
    </div>
    </>
  )
}
