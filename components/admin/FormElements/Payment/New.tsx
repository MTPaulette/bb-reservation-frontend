"use client"

import { useState } from "react";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { PencilSquareIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { PaymentFormType } from "@/lib/definitions";
import { paymentMethods } from "@/lib/data";
import { createdPayment } from "@/lib/action/payments";

export default function NewPayment({ reservation_id }: { reservation_id: number|string} ) {
  const t_input = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const schema: ZodType<PaymentFormType> = z
    .object({
      amount: z.string().min(1),
      payment_method: z.string().min(1),
      transaction_id: z.string().optional(),
      bill_number: z.string().optional(),
      note: z.string().max(1000).optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormType>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: PaymentFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    createdPayment(data, Number(reservation_id))
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t_input("update_account_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("coupon_not_found"));
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
    });
  }

  return (
    <>
    {error != "" ? (
      <div className="mb-8 md:mt-10">
        <Alert color="danger" message={error} />
      </div>
    ) : null}
    {success != "" ? (
      <div className="mb-8 md:mt-10">
        <Alert color="success" message={success} />
      </div>
    ) : null}
    <div className="w-full">
      <form
        action="#" className="space-y-10 mt-8 md:mt-10"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          isRequired
          label={t_input("amount_payment")}
          labelPlacement="outside"
          type="number"
          placeholder={t_input("amount_payment_placeholder")}
          className="w-full bg-input rounded-small"
          {...register("amount")}
          isInvalid={errors.amount ? true: false}
          errorMessage={errors.amount ? errors.amount?.message: null}
        />
        {/* payment_method */}
        <Select
          isRequired
          aria-label={t_input("payment_method")}
          label={t_input("payment_method")}
          labelPlacement="outside"
          variant="flat"
          placeholder={t_input("payment_method_placeholder")}
          isInvalid={errors.payment_method ? true: false}
          errorMessage={errors.payment_method ? errors.payment_method?.message: null}
          className="w-full bg-input rounded-small"
          {...register("payment_method")}
        >
          {paymentMethods.map((item) => (
            <SelectItem key={item.uid}>
              {locale === "en" ? item.name_en: item.name_fr}
            </SelectItem>
          ))}
        </Select>
        <div className="flex flex-row justify-center items-center gap-4 w-full">
        <Input
          label={t_input("transaction_id")}
          labelPlacement="outside"
          type="number"
          placeholder={t_input("transaction_id_placeholder")}
          className="w-full bg-input rounded-small"
          {...register("transaction_id")}
          isInvalid={errors.transaction_id ? true: false}
          errorMessage={errors.transaction_id ? errors.transaction_id?.message: null}
        />
        <p className="text-foreground/60 font-bold uppercase text-sm">{t_input("or")}</p>
        <Input
          label={t_input("bill_number")}
          labelPlacement="outside"
          type="text"
          placeholder={t_input("bill_number_placeholder")}
          className="w-full bg-input rounded-small"
          {...register("bill_number")}
          isInvalid={errors.bill_number ? true: false}
          errorMessage={errors.bill_number ? errors.bill_number?.message: null}
        />
        </div>
        <Textarea
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t_input("note_reservation")}
          labelPlacement="outside"
          placeholder={t_input("note_reservation_placeholder")}
          classNames={{inputWrapper: "w-full bg-input rounded-small"}}
          {...register("note")}
          isInvalid={errors.note ? true: false}
          errorMessage={errors.note ? errors.note?.message: null}
        />
        <div className="w-full">
          <Button 
            type="submit"
            color="primary"
            isLoading={loading}
            className="w-full"
          >
            {t_input("save")}
          </Button>
        </div>
      </form>
    </div>
    </>
  )
}