"use client"

import React from "react";
import { Button, Input, Select, SelectItem} from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { agencies, roles } from "@/lib/data";
import { UserFormType } from "@/lib/definitions";
import { createStaff } from "@/lib/action/staff";

export default function NewStaff() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const schema: ZodType<UserFormType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }),
      firstname: z.string().min(1, { message: t_error("firstname") }),
      email: z.string().email({
        message:  t_error("email"),
      }),
      password: z
      .string()
      .min(8, { message: t_error("passwordLenght")})
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
        message: t_error("password")
      }),
      phonenumber: z.string(),
      role_id: z.string().length(1),
      agency_id: z.string().length(1),
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
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: UserFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createStaff(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("new_account_success_msg"));
          window.location.reload();
        }, 500);
      } else {
        // console.log(await res.text());
        const err = await res.json();
        setError(JSON.stringify(err.errors))
      }
    })
    .catch((error) => {
      console.error(error)
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
      {/* <h1 className="flex flex-col gap-1 my-2 capitalize">{t("newStaff")}</h1> */}
      <form
        action="#" className="space-y-4 mt-4"
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
            placeholder={t("lastnamePlaceholder")}
            variant="bordered"
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
            placeholder={t("firstnamePlaceholder")}
            variant="bordered"
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
          placeholder={t("emailPlaceholder")}
          variant="bordered"
          {...register("email")}
          isInvalid={errors.email ? true: false}
          errorMessage={errors.email ? errors.email?.message: null}
        />
        <Input
          isRequired
          label={t("password")}
          variant="bordered"
          placeholder={t("passwordPlaceholder")}
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
          endContent={
            <TelephoneIcon fill="currentColor" size={18} />
          }
          label={t("phonenumber")}
          type="text"
          variant="bordered"
          {...register("phonenumber")}
          isInvalid={errors.phonenumber ? true: false}
          errorMessage={errors.phonenumber ? errors.phonenumber?.message: null}
        />
        <div className="flex gap-4">
          <Select
            isRequired
            label={t("role")}
            variant="bordered"
            placeholder={t("rolePlaceholder")}
            isInvalid={errors.role_id ? true: false}
            errorMessage={errors.role_id ? errors.role_id?.message: null}
            // selectedKeys={value}
            className="w-full bg-background rounded-small"
            // onSelectionChange={setValue}
            {...register("role_id")}
          >
            {roles.map((role) => (
              <SelectItem key={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            label={t("agency")}
            variant="bordered"
            placeholder={t("agencyPlaceholder")}
            isInvalid={errors.agency_id ? true: false}
            errorMessage={errors.agency_id ? errors.agency_id?.message: null}
            // selectedKeys={value}
            className="w-full bg-background rounded-small"
            // onSelectionChange={setValue}
            {...register("agency_id")}
          >
            {agencies.map((agency) => (
              <SelectItem key={agency.id}>
                {agency.name}
              </SelectItem>
            ))}
          </Select>
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

