"use client"

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { PencilSquareIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { SpaceFormType } from "@/lib/definitions";
import { createSpace } from "@/lib/action/admin/spaces";
import { signOut } from "next-auth/react";

export default function NewSpace() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<SpaceFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }).max(250),
      nb_place: z.string().min(1),
      description_en: z.string().min(1),
      description_fr: z.string().min(1),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpaceFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: SpaceFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createSpace(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("new_space_success_msg"));
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
      <form
        action="#" className="space-y-4 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input
            isRequired
            autoFocus
            label={t("name")}
            type="text"
            placeholder={t("name_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-full sm:w-3/4"
            {...register("name")}
            isInvalid={errors.name ? true: false}
            errorMessage={errors.name ? errors.name?.message: null}
          />
          <Input
            isRequired
            label={t("nb_place")}
            // type="number"
            placeholder={t("nb_place_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-full sm:w-1/4"
            {...register("nb_place")}
            isInvalid={errors.nb_place ? true: false}
            errorMessage={errors.nb_place ? errors.nb_place?.message: null}
          />
        </div>
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("description_en")}
          placeholder={t("description_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("description_en")}
          isInvalid={errors.description_en ? true: false}
          errorMessage={errors.description_en ? errors.description_en?.message: null}
        />
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("description_fr")}
          placeholder={t("description_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("description_fr")}
          isInvalid={errors.description_fr ? true: false}
          errorMessage={errors.description_fr ? errors.description_fr?.message: null}
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

