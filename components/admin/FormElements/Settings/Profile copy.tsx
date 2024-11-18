"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from 'next-intl';
import { UploadIcon, EnvelopIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import Title from "@/components/Title";
import { CommonSkeleton } from "@/components/Skeletons";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import Alert from "@/components/Alert";
import { UserFormType } from "@/lib/definitions";
import { updateProfile, uploadImage } from "@/lib/action/profile";
import { capitalize } from "@/lib/utils";


export default function Profile () {
  const { data: session } = useSession();
  const user = session?.user;
  const t = useTranslations("Input");
  const t_settings = useTranslations("Settings");
  const t_error = useTranslations("InputError");

  const schema: ZodType<UserFormType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }).max(250),
      firstname: z.string().min(1, { message: t_error("firstname") }).max(250),
      phonenumber: z.string().max(250),
      // email: z.string().email({ message: t_error("email") }),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [image, setImage] = useState<File|null>(null);

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
    updateProfile(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("update_account_success_msg"));
          window.location.reload();
        }, 500);
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

  const handleUpload = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    setError("");
    setSuccess("");
    setLoading(true);
    uploadImage(formData)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setTimeout(() => {
          setSuccess(t("update_account_success_msg"));
          window.location.reload();
        }, 500);
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
  };


  return (
    <>
    {!user ? (
      <CommonSkeleton />
    ) : (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("personal_informations")}</Title>
          </div>
          <div className="px-7 py-4">
            {error != "" ? (
              <Alert color="danger" message={error} />
            ) : null}
            {success != "" ? (
              <Alert color="success" message={success} />
            ) : null}
            <form
              action="#" className="space-y-10 my-4"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  autoFocus
                  endContent={
                    <UserIcon fill="currentColor" size={18} />
                  }
                  label={t("lastname")}
                  labelPlacement="outside"
                  type="text"
                  placeholder={t("lastname_placeholder")}
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
                  labelPlacement="outside"
                  type="text"
                  placeholder={t("firstname_placeholder")}
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
                labelPlacement="outside"
                type="email"
                placeholder={t("email_placeholder")}
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
                labelPlacement="outside"
                type="text"
                variant="bordered"
                placeholder={t("phonenumber_placeholder")}
                defaultValue={user.phonenumber? user.phonenumber: ""}
                {...register("phonenumber")}
                isInvalid={errors.phonenumber ? true: false}
                errorMessage={errors.phonenumber ? errors.phonenumber?.message: null}
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

      <div className="col-span-5 xl:col-span-2">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("photo")}</Title>
          </div>
      <div className="p-4 bg-green-100">
        images: {JSON.stringify(image)}

      {image && (
        <img src={`/images/${image}`} alt="Profile Image" />
      )}
      
      </div>
          <div className="p-7">
            <form action="#" onSubmit={handleUpload}>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full">
                  <Avatar
                    as="button"
                    className="transition-transform"
                    color="default"
                    name={user? user.lastname : ""}
                    size="lg"
                    //src={user? user.image: ""}
                    src="/images/brain-orange-400.png"
                  />
                </div>
                <div>
                  <span className="mb-1.5 text-foreground">
                    {capitalize(t_settings("edit_photo"))}
                  </span>
                  <span className="flex text-sm gap-2.5">
                    <button className="hover:text-danger">
                      {t_settings("delete")}
                    </button>
                    <button className="hover:text-success whitespace-nowrap">
                      {t_settings("update")}
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
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white dark:bg-boxdark">
                    <UploadIcon fill="#3C50E0" size={16} />
                  </span>
                  <p>
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                  <p>(max, 800 X 800px)</p>
                </div>
              </div>

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
        </div>
      </div>
    </div>
    )}
    </>
  );
};

