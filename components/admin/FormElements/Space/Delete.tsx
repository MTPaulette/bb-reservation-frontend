"use client"

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { ConfirmPasswordType } from "@/lib/definitions";
import { deleteSpace } from "@/lib/action/admin/spaces";
import Title from "@/components/Title";

export default function DeleteSpace({ id }: { id: number} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
    const locale = useLocale();

  const schema: ZodType<ConfirmPasswordType> = z
    .object({
      password: z.string().min(1),
  });

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConfirmPasswordType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: ConfirmPasswordType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    deleteSpace(data, id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("delete_space_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("space_not_found"));
            break;
          case 422:
            const err = await res.json();
            // setError(err.password? t_error("wrongPassword"): "")

            if(err.errors.en){
              setError(locale === "en" ? err.errors.en : err.errors.fr);
            } else {
              setError(JSON.stringify(err));
            }
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
        action="#" className="space-y-4 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          isRequired
          label={t("password")}
          variant="bordered"
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

