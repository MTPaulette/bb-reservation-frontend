"use client"

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { CancellationFormType } from "@/lib/definitions";
import { cancelReservation } from "@/lib/action/admin/reservations";
import Title from "@/components/Title";

export default function CancelReservation({ id, state }: { id: number, state: string } ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const schema: ZodType<CancellationFormType> = z
    .object({
      password: z.string().min(1),
      reason_for_cancellation: z.string(),
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
  } = useForm<CancellationFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: CancellationFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    cancelReservation(data, id, state)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(state != 'cancelled' ? t("cancel_reservation_success_msg"): t("undo_cancellation_account_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("reservation_not_found"));
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
        action="#" className="space-y-8 mt-4"
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

        {state != 'cancelled' ? (
          <div className="flex flex-col gap-4">
            <Textarea
              isRequired
              label={t("reason_for_cancellation")}
              placeholder={t("reason_for_cancellation_placeholder")}
              labelPlacement="outside"
              classNames={{inputWrapper: "bg-input rounded-small"}}
              {...register("reason_for_cancellation")}
              isInvalid={errors.reason_for_cancellation ? true: false}
              errorMessage={errors.reason_for_cancellation ? errors.reason_for_cancellation?.message: null}
            />
          </div>
        ) : 
        <div className={`${state != 'cancelled' ? 'block': 'hidden'}`}>
          <Textarea
            isRequired
            label={t("reason_for_cancellation")}
            placeholder={t("reason_for_cancellation_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            defaultValue=""
            {...register("reason_for_cancellation")}
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
