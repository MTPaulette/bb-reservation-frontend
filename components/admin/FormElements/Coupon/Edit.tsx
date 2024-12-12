"use client"

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { PencilSquareIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { CouponFormType } from "@/lib/definitions";
import { getClients } from "@/lib/action/clients";
import Title from "@/components/Title";
import { getCouponById, updateCoupon } from "@/lib/action/coupons";
import { getUsername } from "@/lib/utils";
import Loader from "../../Common/Loader";


export default function EditCoupon({ id }: { id: number} ) {
  const t_input = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();


  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [clients, setClients] = useState([]);
  const [coupon, setCoupon] = useState(null);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormType>({
    resolver: zodResolver(schema),
  })

  let default_clients: number[] = [];
  useEffect(() => {
    getCouponById(id)
      .then(async (res) => {
        if(res?.ok){
          const coupon = await res.json();
          setCoupon(coupon);
          coupon.users.forEach(client => {
            default_clients.push(client.user_id);
          });
          setSelectedClients(default_clients);
          default_clients = [];
        }
    });
    getClients()
      .then(async (res) => {
        if(res?.ok){
          setClients(await res.json());
        }
    });
  }, []);

  const handleCheckboxChange = (e: { target: { value: string; checked: any; }; }) => {
    const clientId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedClients((prevClients) => [...prevClients, clientId]);
    } else {
      setSelectedClients((prevClients) =>
        prevClients.filter((client) => client !== clientId)
      );
    }
  };

  const checkAll = (e: { target: { checked: any; }; }) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      clients.forEach(client => {
        setSelectedClients((prevClients) => [...prevClients, client.id]);
      });
    } else {
      clients.forEach(item => {
        setSelectedClients((prevClients) =>
          prevClients.filter((client) => client !== item.id)
        );
      });
    }
  }

  const handleFormSubmit = async (data: CouponFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateCoupon(data, coupon?.id, selectedClients)
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

  type ClientType = typeof clients[0];

  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
      {success != "" ? (
        <Alert color="success" message={success} />
      ) : null}
      {coupon ? (
      <form
        action="#" className="space-y-8 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          isRequired
          autoFocus
          label={t_input("coupon")}
          type="text"
          placeholder={t_input("coupon_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          className="w-full"
          {...register("name")}
          isInvalid={errors.name ? true: false}
          errorMessage={errors.name ? errors.name?.message: null}
          defaultValue={coupon ? coupon.name: ""}
        />
        <Input
          isRequired
          label={t_input("total_usage")}
          type="number"
          placeholder={t_input("total_usage_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          className="w-full"
          {...register("total_usage")}
          isInvalid={errors.total_usage ? true: false}
          errorMessage={errors.total_usage ? errors.total_usage?.message: null}
          defaultValue={coupon ? coupon.total_usage: undefined}
        />
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <Input
            isRequired
            label={t_input("amount")}
            type="number"
            placeholder={t_input("amount_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-1/2"
            {...register("amount")}
            isInvalid={errors.amount ? true: false}
            errorMessage={errors.amount ? errors.amount?.message: null}
            defaultValue={coupon ? coupon.amount: null}
          />
          <p className="text-foreground/60 font-bold uppercase text-sm">{t_input("or")}</p>
          <Input
            isRequired
            label={t_input("percent")}
            type="number"
            placeholder={t_input("percent_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-1/2"
            {...register("percent")}
            isInvalid={errors.percent ? true: false}
            errorMessage={errors.percent ? errors.percent?.message: null}
            defaultValue={coupon ? coupon.percent: null}
          />
        </div>
        <Input
          isRequired
          label={t_input("expired_on")}
          type="text"
          placeholder={t_input("percent_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          className="w-full"
          {...register("expired_on")}
          isInvalid={errors.expired_on ? true: false}
          errorMessage={errors.expired_on ? errors.expired_on?.message: null}
          defaultValue={coupon ? coupon.expired_on: undefined}
        />
        <Textarea
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t_input("note_en")}
          placeholder={t_input("note_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-full"
          {...register("note_en")}
          isInvalid={errors.note_en ? true: false}
          errorMessage={errors.note_en ? errors.note_en?.message: null}
          defaultValue={coupon ? coupon.note_en: ""}
        />
        <Textarea
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t_input("note_fr")}
          placeholder={t_input("note_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("note_fr")}
          isInvalid={errors.note_fr ? true: false}
          errorMessage={errors.note_fr ? errors.note_fr?.message: null}
          defaultValue={coupon ? coupon.note_fr: ""}
        />

        {/* clients */}
        {clients ? (
          <>
          <Title className="text-xl mt-2">{t_input("sended_to_clients")}</Title>
          <div className="w-full flex items-center justify-end gap-2">
            <Checkbox
              onChange={checkAll}
              className="z-1"
            />
            <p className="font-light text-sm">{t_input("select_all")}</p>
          </div>
          <div className="pb-4 px-2 sm:px-6 grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-0.5 p-1">
            {clients.map((client: ClientType) => (
              <ul key={client.id} className="flex items-center gap-4 p-1">
                <Checkbox
                  value={client.id}
                  onChange={handleCheckboxChange}
                  isSelected={selectedClients.includes(client.id)}
                  className="z-1"
                />
                <li className="font-light text-sm text-foreground">
                  {getUsername(client.lastname, client.firstname)}
                </li>
              </ul>
            ))}
          </div>
          </>
        ) : (
          <Loader />
        )}

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
      ) : (
        <Loader />
      )}
    </div>
    </>
  )
}