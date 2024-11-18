"use client"

import React from "react";
import { Button, Input, Link} from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { AuthUserType } from "@/lib/definitions";
import { createAccount } from "@/lib/action/authentication";


export default function RegisterPage() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<AuthUserType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }).max(250),
      firstname: z.string().min(1, { message: t_error("firstname") }).max(250),
      email: z.string().email({
        message:  t_error("email"),
      }).max(250),
      password: z
      .string()
      .min(8, { message: t_error("passwordLenght")})
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
        message: t_error("password")
      }).max(250),
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
  } = useForm<AuthUserType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: AuthUserType) => {
    setError("")
    setLoading(true);
    createAccount(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })
        .then((res) => {
          setLoading(false);
          if(res?.ok) {
            // router.push('/fr/dashboard1');
            router.push(`/${locale}/admin`);
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
      } else {
        const response = await res.json()
        setError(response.errors.email[0]);
      }
    })
    .catch((error) => {
      setLoading(false);
      setError(t_error("invalid_credentials"));
      console.log(error);
    })
  }

  return (
    <>
    <div className="w-[270px] md:w-[350px]">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) : null}
    <h1 className="flex flex-col gap-1 my-2 capitalize">{t("register")}</h1>
    <form
      action="#" className="space-y-3"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        autoFocus
        endContent={
          <UserIcon fill="currentColor" size={18} />
        }
        label={t("lastname")}
        type="text"
        placeholder={t("lastname_placeholder")}
        variant="bordered"
        {...register("lastname")}
        isInvalid={errors.lastname ? true: false}
        errorMessage={errors.lastname ? errors.lastname?.message: null}
      />
      <Input
        autoFocus
        endContent={
          <UserIcon fill="currentColor" size={18} />
        }
        label={t("firstname")}
        type="text"
        placeholder={t("firstname_placeholder")}
        variant="bordered"
        {...register("firstname")}
        isInvalid={errors.firstname ? true: false}
        errorMessage={errors.firstname ? errors.firstname?.message: null}
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
      <div className="w-full">
        <Button 
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full"
        >
          {t("register")}
        </Button>
      </div>
    </form>
    <div className="flex justify-end mt-2">
      <Link color="primary" href={`/${locale}/auth/login`} size="sm">
        {t("have_account_link")}
      </Link>
    </div>
    </div>
    </>
  )
}


