"use client"

import React from "react";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { UserFormType } from "@/lib/definitions";
import { createClient } from "@/lib/action/admin/clients";
import { languages } from "@/lib/data";
import { signOut } from "next-auth/react";

export default function NewClient() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<UserFormType> = z
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
      }).max(50),
      phonenumber: z
      .string()
      .regex(/^(2[0-9]{2}[6](2|5|6|7|8|9)[0-9]{7})$/, {
        message: t_error("phonenumber")
      })
      .length(12),
      language: z.string().min(1),
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
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: UserFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createClient(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("new_account_success_msg"));
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
      {/* <h1 className="flex flex-col gap-1 my-2 capitalize">{t("newClient")}</h1> */}
      <form
        action="#" className="space-y-10 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex gap-4">
          <Input
            isRequired
            autoFocus
            endContent={
              <UserIcon fill="currentColor" size={18} />
            }
            label={t("lastname")}
            type="text"
            placeholder={t("lastname_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            {...register("lastname")}
            isInvalid={errors.lastname ? true: false}
            errorMessage={errors.lastname ? errors.lastname?.message: null}
          />
          <Input
            isRequired
            endContent={
              <UserIcon fill="currentColor" size={18} />
            }
            label={t("firstname")}
            type="text"
            placeholder={t("firstname_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            {...register("firstname")}
            isInvalid={errors.firstname ? true: false}
            errorMessage={errors.firstname ? errors.firstname?.message: null}
          />
        </div>
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

        {/* language */}
        <Select
          isRequired
          aria-label={t("language")}
          label={t("language")}
          labelPlacement="outside"
          variant="bordered"
          placeholder={t("language_placeholder")}
          isInvalid={errors.language ? true: false}
          errorMessage={errors.language ? errors.language?.message: null}
          defaultSelectedKeys={['fr']}
          {...register("language")}
        >
          {languages.map((item) => (
            <SelectItem key={item.uid}>
              {locale === "en" ? item.name_en: item.name_fr}
            </SelectItem>
          ))}
        </Select>

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

