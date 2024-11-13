"use client"

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { EnvelopIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { UserType, UserFormType } from "@/lib/definitions";
import { updateClient } from "@/lib/action/clients";


export default function EditClient({ user }: { user: UserType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const schema: ZodType<UserFormType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }),
      firstname: z.string().min(1, { message: t_error("firstname") }),
      phonenumber: z.string(),
  });

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
    updateClient(data, user.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("update_account_success_msg"));
          window.location.reload();
        }, 300);
      } else {
        const status = res.status;
        switch (status) {
          case 404:
            setError(t_error("user_not_found"));
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
        <div className="flex gap-4">
          <Input
            autoFocus
            endContent={
              <UserIcon fill="currentColor" size={18} />
            }
            label={t("lastname")}
            type="text"
            placeholder={t("lastnamePlaceholder")}
            variant="bordered"
            defaultValue={user.lastname? user.lastname: ""}
            {...register("lastname")}
            isInvalid={errors.lastname ? true: false}
            errorMessage={errors.lastname ? errors.lastname?.message: null}
          />
          <Input
            endContent={
              <UserIcon fill="currentColor" size={18} />
            }
            label={t("firstname")}
            type="text"
            placeholder={t("firstnamePlaceholder")}
            variant="bordered"
            defaultValue={user.firstname? user.firstname: ""}
            {...register("firstname")}
            isInvalid={errors.firstname ? true: false}
            errorMessage={errors.firstname ? errors.firstname?.message: null}
          />
        </div>
        <Input
          isDisabled
          endContent={
            <EnvelopIcon fill="currentColor" size={18} />
          }
          label={t("email")}
          type="email"
          placeholder={t("emailPlaceholder")}
          defaultValue={user.email? user.email: ""}
          variant="bordered"
          {...register("email")}
          isInvalid={errors.email ? true: false}
          errorMessage={errors.email ? errors.email?.message: null}
        />
        <Input
          endContent={
            <TelephoneIcon fill="currentColor" size={18} />
          }
          label={t("phonenumber")}
          type="text"
          variant="bordered"
          placeholder={t("phonenumberPlaceholder")}
          defaultValue={user.phonenumber? user.phonenumber: ""}
          {...register("phonenumber")}
          isInvalid={errors.phonenumber ? true: false}
          errorMessage={errors.phonenumber ? errors.phonenumber?.message: null}
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

