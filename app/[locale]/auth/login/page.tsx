"use client"

import React from "react";
import { Button, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from "next/navigation";

import Alert from "@/components/Alert";

type TSignInForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<TSignInForm> = z
    .object({
      email: z.string().email({
        message: t_error("email"),
      }).max(250),
      password: z.string().min(1, { message: t_error("passwordLenght") }).max(50),
  });

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

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
    await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
    })
    .then((res) => {
      setLoading(false);
      if(res?.ok) {
        router.push(`/${locale}/admin/profile`);
      } else {
        if(res?.error === "CredentialsSignin"){
          setError(t_error("invalid_credentials"));
        } else {
          setError(t_error("invalid_credentials"));
        }
      }
    })
    .catch(err => {
      console.log("login error: ");
      console.log(err);
    })
  }

  return (
    <>
    <div className="w-[270px] md:w-[350px]">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) : null}
    <h1 className="flex flex-col gap-1 mb-2 capitalize">{t("login")}</h1>
    <form
      action="#" className="space-y-3"
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
      <Input
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
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
        >
          {t("remember_me")}
        </Checkbox>
        <Link color="primary" href="#" size="sm">
          {t("forgot_password_link")}
        </Link>
      </div>
      <div className="w-full">
        <Button 
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full"
        >
          {t("login")}
        </Button>
      </div>
    </form>
    <div className="mt-2 capitalize">
      <Link color="primary" href={`/${locale}/auth/register`} size="sm">
        {t("register")}
      </Link>
    </div>
    </div>
    </>
  )
}

