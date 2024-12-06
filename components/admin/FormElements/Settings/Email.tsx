"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import Title from "@/components/Title";
import { CommonSkeleton } from "@/components/Skeletons";
import { Button, Input } from "@nextui-org/react";
import Alert from "@/components/Alert";
import { OptionType } from "@/lib/definitions";
import { getOptions, saveOptions } from '@/lib/action/options';

export default function EmailSettings () {
  const locale = useLocale();
  const t = useTranslations("Input");
  const t_settings = useTranslations("Settings");
  const t_error = useTranslations("InputError");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getOptions()
    .then(async (res) => {
      setLoading(false);
      const data = await res.json();
      setOptions(data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleOptionUpdation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    saveOptions(options)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("update_options_success_msg"));
      } else {
        const status = res.status;
        switch(status) {
          case 401:
            setError(t_error("unauthenticated"));
            await signOut({
              callbackUrl: `/${locale}/auth/login`
            });
            break;
          case 404:
            setError(t_error("options_not_found"));
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

  const handleUpdateOption = (option: OptionType) => {
    const data = {
      id: option.id,
      value: option.value,
    }
    setOptions(options.map((opt) => opt.id === option.id ? data : opt));
  }

  return (
    <>
    {!options.length > 0 ? (
      <CommonSkeleton />
    ) : (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 order-1 xl:order-2 xl:col-span-3">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("smtp_configurations")}</Title>
          </div>
          <div className="px-7 py-4">
            {error != "" ? (
              <Alert color="danger" message={error} />
            ) : null}
            {success != "" ? (
              <Alert color="success" message={success} />
            ) : null}

            <form
              action="#" className="space-y-10 mt-8 mb-4 z-2"
              // onSubmit={handleSubmit(handleFormSubmit)}
              onSubmit={handleOptionUpdation}
            >
            <Input
              label={t("smtp_email")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'smtp_email')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'smtp_email'), id: options.find((opt) => opt.name === 'smtp_email')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("smtp_password")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'smtp_password')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'smtp_password'), id: options.find((opt) => opt.name === 'smtp_password')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("smtp_port")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'smtp_port')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'smtp_port'), id: options.find((opt) => opt.name === 'smtp_port')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("smtp_host")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'smtp_host')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'smtp_host'), id: options.find((opt) => opt.name === 'smtp_host')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("email_protocol")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'email_protocol')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'email_protocol'), id: options.find((opt) => opt.name === 'email_protocol')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
              <div className="w-full -mt-12">
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
        </div>
      </div>
    </div>
    )}
    </>
  );
};

