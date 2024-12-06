"use client"

import React from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { PencilSquareIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { CouponFormType } from "@/lib/definitions";
import { createCoupon } from "@/lib/action/coupons";

export default function NewCoupon() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const schema: ZodType<CouponFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }).max(250),
      total_usage: z.string().min(1),
      percent: z.string(),
      amount: z.string(),
      // expired_on: z.date().min(new Date()),
      expired_on: z.string(),
      note_en: z.string(),
      note_fr: z.string(),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: CouponFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createCoupon(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("new_coupon_success_msg"));
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
        <Input
          isRequired
          autoFocus
          label={t("coupon")}
          type="text"
          placeholder={t("coupon_placeholder")}
          variant="bordered"
          className="w-full"
          {...register("name")}
          isInvalid={errors.name ? true: false}
          errorMessage={errors.name ? errors.name?.message: null}
        />
        <Input
          isRequired
          label={t("total_usage")}
          type="number"
          placeholder={t("total_usage_placeholder")}
          variant="bordered"
          className="w-full"
          {...register("total_usage")}
          isInvalid={errors.total_usage ? true: false}
          errorMessage={errors.total_usage ? errors.total_usage?.message: null}
        />
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <Input
            isRequired
            label={t("amount")}
            type="number"
            placeholder={t("amount_placeholder")}
            variant="bordered"
            className="w-1/2"
            {...register("amount")}
            isInvalid={errors.amount ? true: false}
            errorMessage={errors.amount ? errors.amount?.message: null}
          />
          <p className="text-foreground/60 font-bold uppercase text-sm">{t("or")}</p>
          <Input
            isRequired
            label={t("percent")}
            type="number"
            placeholder={t("percent_placeholder")}
            variant="bordered"
            className="w-1/2"
            {...register("percent")}
            isInvalid={errors.percent ? true: false}
            errorMessage={errors.percent ? errors.percent?.message: null}
          />
        </div>
        <Input
          isRequired
          label={t("expired_on")}
          type="date"
          placeholder={t("percent_placeholder")}
          variant="bordered"
          className="w-full"
          {...register("expired_on")}
          isInvalid={errors.expired_on ? true: false}
          errorMessage={errors.expired_on ? errors.expired_on?.message: null}
        />
        <Textarea
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("note_en")}
          placeholder={t("note_placeholder")}
          variant="bordered"
            className="w-full"
          {...register("note_en")}
          isInvalid={errors.note_en ? true: false}
          errorMessage={errors.note_en ? errors.note_en?.message: null}
        />
        <Textarea
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("note_fr")}
          placeholder={t("note_placeholder")}
          variant="bordered"
          {...register("note_fr")}
          isInvalid={errors.note_fr ? true: false}
          errorMessage={errors.note_fr ? errors.note_fr?.message: null}
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

