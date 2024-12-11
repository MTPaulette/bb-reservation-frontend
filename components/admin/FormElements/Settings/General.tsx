"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import { TrashIcon } from "@/components/Icons";
import Title from "@/components/Title";
import { CommonSkeleton } from "@/components/Skeletons";
import { Button, Input } from "@nextui-org/react";
import Alert from "@/components/Alert";
import { HolidayType, OptionType } from "@/lib/definitions";
import { getOptions, saveHolidays, saveOptions } from '@/lib/action/options';

export default function General () {
  const locale = useLocale();
  const t = useTranslations("Input");
  const t_settings = useTranslations("Settings");
  const t_error = useTranslations("InputError");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  const [loadingHolidays, setHoadingHolidays] = useState<boolean>(false);
  const [errorHolidays, setErrorHolidays] = useState<string>("");
  const [successHolidays, setSuccessHolidays] = useState<string>("");

  const [options, setOptions] = useState([]);

  const [holidays, setHolidays] = useState<HolidayType[]>([]);

  const handleAddHoliday = (date: string) => {
    setHolidays((prevHolidays) => [...prevHolidays, date]);
  };
  
  const handleRemoveHoliday = (index: number) => {
    setHolidays(holidays.filter((holiday, i) => i !== index));
  };

  useEffect(() => {
    getOptions()
    .then(async (res) => {
      setLoading(false);
      const data = await res.json();
      setOptions(data);
      const holidaysOption = data.find((option: any) => option.name === 'holidays');
      const holidaysValues = holidaysOption.value.split(",");
      setHolidays(holidaysValues);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleHolidaySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHoadingHolidays(true);
    saveHolidays(holidays)
    .then(async (res) => {
      setHoadingHolidays(false);
      if(res?.ok) {
        setSuccessHolidays(t("update_holidays_success_msg"));
        setTimeout(() => {
          setSuccessHolidays("");
        }, 5000);
      } else {
        const status = res.status;
        switch(status) {
          case 401:
            setErrorHolidays(t_error("unauthenticated"));
            await signOut({
              callbackUrl: `/${locale}/auth/login`
            });
            break;
          case 404:
            setErrorHolidays(t_error("options_not_found"));
            break;
          case 422:
            const err = await res.json();
            setErrorHolidays(JSON.stringify(err.errors));
            break;
          case 403:
            setErrorHolidays(t_error("acces_denied"));
            break;
          case 500:
            setErrorHolidays(t_error("something_wrong"));
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
  };

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
        setTimeout(() => {
          setSuccess("");
        }, 5000);
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
      <div className="col-span-5 order-1 xl:order-2 xl:col-span-5">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("company_informations")}</Title>
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
              label={t("companyname")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'companyname')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'companyname'), id: options.find((opt) => opt.name === 'companyname')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("address")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'address')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'address'), id: options.find((opt) => opt.name === 'address')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("city")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'city')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'city'), id: options.find((opt) => opt.name === 'city')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("phonenumber")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'phonenumber')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'phonenumber'), id: options.find((opt) => opt.name === 'phonenumber')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("URL")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'URL')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'URL'), id: options.find((opt) => opt.name === 'URL')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("whatsapp")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'whatsapp')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'whatsapp'), id: options.find((opt) => opt.name === 'whatsapp')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("facebook")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'facebook')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'facebook'), id: options.find((opt) => opt.name === 'facebook')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("instagram")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'instagram')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'instagram'), id: options.find((opt) => opt.name === 'instagram')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("linkedln")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'linkedln')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'linkedln'), id: options.find((opt) => opt.name === 'linkedln')?.id, value: event.target.value };
                handleUpdateOption(updatedOption);
              }}
            />
            <Input
              label={t("twitter")}
              labelPlacement="outside"
              type="text"
              variant="bordered"
              defaultValue={options.find((opt) => opt.name === 'twitter')?.value}
              onChange={(event) => {
                const updatedOption = { ...options.find((opt) => opt.name === 'twitter'), id: options.find((opt) => opt.name === 'twitter')?.id, value: event.target.value };
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

        {/* holidays */}
        <div className="rounded-sm border border-divider bg-background shadow-default mt-8">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("holidays")}</Title>
          </div>
          <div className="px-7 py-4">
            {errorHolidays != "" ? (
              <Alert color="danger" message={errorHolidays} />
            ) : null}
            {successHolidays != "" ? (
              <Alert color="success" message={successHolidays} />
            ) : null}
            <form 
              action="#" className="space-y-4 my-4 z-2"
              onSubmit={handleHolidaySubmit}
            >
              <label>
                {t("add_holiday")} :
              </label>
              <Input
                isRequired
                aria-label={t("expired_on")}
                type="date"
                variant="bordered"
                className="w-full"
                onChange={(event) => handleAddHoliday(event.target.value)}
              />
              <ul>
                {holidays.map((holiday, index) => (
                  <li key={index}>
                    {holiday}
                    <Button
                      isIconOnly
                      type="button"
                      color="danger"
                      radius="full" size="sm" variant="light"
                      onClick={() => handleRemoveHoliday(index)}
                    >
                      <TrashIcon fill="currentColor" size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="w-full">
                <Button 
                  type="submit"
                  color="primary"
                  isLoading={loadingHolidays}
                  className="w-full"
                >
                  {t("save")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* logo 
      <div className="col-span-5 order-2 xl:oreder-1 xl:col-span-2">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("photo")}</Title>
          </div>
          <div className="px-7 py-4">
            {errorHolidays != "" ? (
              <Alert color="danger" message={errorHolidays} />
            ) : null}
            {successHolidays != "" ? (
              <Alert color="success" message={successHolidays} />
            ) : null}
            <form action="#" onSubmit={handleUpload} className="my-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full">
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="default"
                    size="lg"
                    src={src? src: ''}
                  />
                </div>
                <div>
                  <span className="mb-1.5 text-foreground">
                    {capitalize(t_settings("edit_photo"))}
                  </span>
                  <span className="flex text-sm gap-2.5">
                    <button className="hover:text-danger" onClick={handleDeleteProfilePic} disabled={!options?.image}>
                      {t_settings("delete")}
                    </button>
                  </span>
                </div>
              </div>
      
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-transparent dark:bg-content2 px-4 py-4 sm:py-7.5"
              >
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="absolute inset-0 z-1 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white dark:bg-boxdark">
                    <UploadIcon fill="#3C50E0" size={16} />
                  </span>
                  <p className="text-primary">
                    {t_settings("drap_drop")}
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG, GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>

              <div className="w-full">
                <Button 
                  type="submit"
                  color="primary"
                  isLoading={loadingImg}
                  className="w-full"
                >
                  {t("save")}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>*/}
    </div>
    )}
    </>
  );
};

