"use client"

import React, { useEffect } from "react";
import { Button, Input, Select, SelectItem} from "@nextui-org/react";
import { EnvelopIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
// import { agencies, roles } from "@/lib/data";
import { roles } from "@/lib/data";
import { UserType, UserFormType } from "@/lib/definitions";
import { updateStaff } from "@/lib/action/admin/staff";
import { languages } from "@/lib/data";
import { signOut } from "next-auth/react";
import { getAgencies } from "@/lib/action/default";


export default function EditStaff({ user }: { user: UserType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();
  const [agencies, setAgencies] = useState([]);

  const schema: ZodType<UserFormType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }).max(250),
      firstname: z.string().min(1, { message: t_error("firstname") }).max(250),
      phonenumber: z
      .string()
      .regex(/^(2[0-9]{2}[6](2|5|6|7|8|9)[0-9]{7})$/, {
        message: t_error("phonenumber")
      })
      .length(12),
      language: z.string().min(1),
      role_id: z.string().min(1),
      agency_id: z.string().min(1),
  });

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

  useEffect(() => {
    setError("");
    getAgencies()
      .then(async (res) => {
        if(res?.ok){
          setAgencies(await res.json());
        }else {
          setError(t_error("something_wrong"));
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, [t_error]);

  const handleFormSubmit = async (data: UserFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateStaff(data, user.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("update_account_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        const err = await res.json();
        switch(status) {
          case 401:
            setError(t_error("unauthenticated"));
            setTimeout(async () => {
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
            }, 500);
            break;
          case 404:
            setError(t_error("user_not_found"));
            break;
          case 422:
            setError(JSON.stringify(err.errors));
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            setError(locale === "en" ? err.errors.en : err.errors.fr);
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
        action="#" className="space-y-10 mt-4"
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
            placeholder={t("lastname_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
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
            placeholder={t("firstname_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
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
          placeholder={t("email_placeholder")}
          defaultValue={user.email? user.email: ""}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("email")}
          isInvalid={errors.email ? true: false}
          errorMessage={errors.email ? errors.email?.message: null}
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
          defaultValue={user.phonenumber? user.phonenumber: ""}
          {...register("phonenumber")}
          isInvalid={errors.phonenumber ? true: false}
          errorMessage={errors.phonenumber ? errors.phonenumber?.message: null}
        />
        <div className="flex items-start gap-4">
          <Select
            label={t("role")}
            labelPlacement="outside"
            variant="bordered"
            // className="w-full bg-input rounded-small"
            placeholder={t("role_placeholder")}
            isInvalid={errors.role_id ? true: false}
            errorMessage={errors.role_id ? errors.role_id?.message: null}
            defaultSelectedKeys={[user.role_id.toString()]}
            {...register("role_id")}
          >
            {roles.map((role) => (
              <SelectItem key={role.id} value={role.id}>
                {role.name}
              </SelectItem>
            ))}
          </Select>
          <Select
            label={t("agency")}
            labelPlacement="outside"
            variant="bordered"
            // className="w-full bg-input rounded-small"
            placeholder={t("agency_placeholder")}
            isInvalid={errors.agency_id ? true: false}
            errorMessage={errors.agency_id ? errors.agency_id?.message: null}
            // defaultSelectedKeys={[user.work_at.toString()]}
            {...register("agency_id")}
          >
            {agencies.map((agency) => (
              <SelectItem key={agency.id} value={agency.id}>
                {agency.name}
              </SelectItem>
            ))}
          </Select>
        </div>

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
          defaultSelectedKeys={[user.language]}
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

