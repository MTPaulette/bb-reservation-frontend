"use client"

import React from "react";
import { Button, Textarea } from "@nextui-org/react";
import { PencilSquareIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { CharacteristicType, CharacteristicFormType } from "@/lib/definitions";
import { updateCharacteristic } from "@/lib/action/characteristics";

export default function EditCharacteristic({ characteristic }: { characteristic: CharacteristicType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const schema: ZodType<CharacteristicFormType> = z
    .object({
      name_en: z.string().min(1, { message: t_error("name") }).max(250),
      name_fr: z.string().min(1, { message: t_error("name") }).max(250),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CharacteristicFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: CharacteristicFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateCharacteristic(data, characteristic.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("update_characteristic_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
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
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("characteristic_en")}
          placeholder={t("characteristic_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("name_en")}
          isInvalid={errors.name_en ? true: false}
          errorMessage={errors.name_en ? errors.name_en?.message: null}
          defaultValue={characteristic ? characteristic.name_en: ""}
        />
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("characteristic_fr")}
          placeholder={t("characteristic_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("name_fr")}
          isInvalid={errors.name_fr ? true: false}
          errorMessage={errors.name_fr ? errors.name_fr?.message: null}
          defaultValue={characteristic ? characteristic.name_fr: ""}
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

