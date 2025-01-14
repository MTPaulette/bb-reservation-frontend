"use client"

import React from "react";
import { Button, Input, Link} from "@nextui-org/react";
import { EnvelopIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';

import Alert from "@/components/Alert";
import { forgotPassword } from "@/lib/action/authentication";

type TSignInForm = {
  email: string
}

export default function ForgotPasswordComponent() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<TSignInForm> = z
    .object({
      email: z.string().email({
        message: t_error("email"),
      }).max(250)
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: TSignInForm) => {
    setError("");
    setLoading(true);
    forgotPassword(data.email)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("forgot_password_success_msg"));
      } else {
        const err = await res.json();
        setError(JSON.stringify(err.errors));
      }
    })
    .catch(error => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  }

  return (
    <div className="w-[270px] md:w-[350px]">
      <h1 className="mb-2 capitalize font-semibold">{t("forgot_password")}</h1>
      <p className="mb-3 font-medium text-foreground dark:font-normal dark:text-foreground/60 text-sm text-justify">
        {t("forgot_password_description")}
      </p>

      {success != "" ? (
        <div className="mb-3">
          <Alert color="success" message={success} />
        </div>
      ) : (
      <>
      {error != "" ? (
        <div className="mb-3">
          <Alert color="danger" message={error} />
        </div>
      ) : null}

      <form
        action="#" className="space-y-6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          autoFocus
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
        />
        <div className="w-full">
          <Button 
            type="submit"
            color="primary"
            isLoading={loading}
            className="w-full"
          >
            {t("sent_reset_link")}
          </Button>
        </div>
      </form>
      <p className="mt-4 text-sm font-light text-foreground/60 dark:font-extralight dark:text-foreground">
        {t("have_account")}
        <Link
          color="primary"
          href={`/${locale}/auth/login`}
          size="sm"
          className="capitalize ml-2"
        >
          {t("login")}
        </Link>
      </p>
      </>
      )}
    </div>
  )
}

