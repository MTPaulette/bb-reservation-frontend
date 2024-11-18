"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import { UploadIcon, EnvelopIcon, EyeIcon, EyeSlashIcon, TelephoneIcon, UserIcon } from "@/components/Icons";
import Title from "@/components/Title";
import { CommonSkeleton } from "@/components/Skeletons";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import Alert from "@/components/Alert";
import { UserFormType } from "@/lib/definitions";
import { updateProfile, uploadImage, changePassword, deleteProfilePic } from "@/lib/action/profile";
import { capitalize, getUrl } from "@/lib/utils";


export default function Profile () {
  const { data: session, update } = useSession();
  const user = session?.user;
  const locale = useLocale();
  const t = useTranslations("Input");
  const t_settings = useTranslations("Settings");
  const t_error = useTranslations("InputError");
  const t_requirements = useTranslations("Requirements");

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  const [loadingImg, setLoadingImg] = useState<boolean>(false);
  const [errorImg, setErrorImg] = useState<string>("");
  const [successImg, setSuccessImg] = useState<string>("");
  
  const [loadingPwd, setLoadingPwd] = useState<boolean>(false);
  const [errorPwd, setErrorPwd] = useState<string>("");
  const [successPwd, setSuccessPwd] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [current_password, setCurrent_password] = useState<string>("");

  const [src, setSrc] = useState();
  const [image, setImage] = useState<File|null>(null);

  const schema: ZodType<UserFormType> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }).max(250),
      firstname: z.string().min(1, { message: t_error("firstname") }).max(250),
      phonenumber: z.string().max(250),
      email: z.string().email({ message: t_error("email") }).max(250),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(schema),
  })

  const validatePassword = (password: string) => password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/);

  const isInvalid = React.useMemo(() => {
    if (password === "") return false;

    return validatePassword(password) ? false : true;
  }, [password]);


  const handleFormSubmit = async (data: UserFormType) => {
    setError("");
    setSuccess("");
    setLoading(true);
    updateProfile(data)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        const response = await res.json();
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            firstname: "pascaline"
          },
          accessToken: response.token
        };
        await update(newSession);
        setSuccess(t("update_account_success_msg"));
        setTimeout(() => {
          setSuccess("");
          // window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch (status) {
          case 401:
            setError(t_error("unauthenticated"));
            await signOut({
              callbackUrl: `/${locale}/auth/login`
            });
            break;
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
    setErrorImg("");
    setLoadingImg(true);
    uploadImage(formData)
    .then(async (res) => {
      setLoadingImg(false);
      if(res?.ok) {
        const response = await res.json();
        setImage(response.src);
        setSrc(response.src);
        setSuccessImg(t("update_account_success_msg"));
        setTimeout(() => {
          setSuccessImg("");
        }, 1000);
      } else {
        const status = res.status;
        switch (status) {
          case 404:
            setErrorImg(t_error("user_not_found"));
            break;
          case 422:
            const err = await res.json();
            setErrorImg(JSON.stringify(err.errors));
            break;
          case 403:
            setErrorImg(t_error("acces_denied"));
            break;
          case 500:
            setErrorImg(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setErrorImg(t_error("something_wrong"));
      console.error(error);
    })
  };

  const handleChangePassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorPwd("");
    setSuccessPwd("");
    setLoadingPwd(true);
    changePassword(current_password, password)
    .then(async (res) => {
      setLoadingPwd(false);
      if(res?.ok) {
        const response = await res.json();
        session!.accessToken = response.token;
        update(session);
        setTimeout(() => {
          setSuccessPwd(t("update_account_success_msg"));
        }, 500);
        setSuccessPwd("");
      } else {
        const status = res.status;
        switch (status) {
          case 404:
            setErrorPwd(t_error("user_not_found"));
            break;
          case 422:
            const err = await res.json();
            setErrorPwd(JSON.stringify(err));
            break;
          case 403:
            setErrorPwd(t_error("acces_denied"));
            break;
          case 500:
            setErrorPwd(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setErrorPwd(t_error("something_wrong"));
      console.error(error);
    })
  }

  const handleDeleteProfilePic = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setErrorImg("");
    setLoadingImg(true);
    deleteProfilePic()
    .then(async (res) => {
      setLoadingImg(false);
      if(res?.ok) {
        const response = await res.json();
        setImage(response.src);
        setSrc(response.src);
        setSuccessImg(t("update_account_success_msg"));
        setTimeout(() => {
          setSuccessImg("");
        }, 1000);
      } else {
        const status = res.status;
        switch (status) {
          case 404:
            setErrorImg(t_error("user_not_found"));
            break;
          case 422:
            const err = await res.json();
            setErrorImg(JSON.stringify(err.errors));
            break;
          case 403:
            setErrorImg(t_error("acces_denied"));
            break;
          case 500:
            setErrorImg(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setErrorImg(t_error("something_wrong"));
      console.error(error);
    })
  };


  return (
    <>
    {!user ? (
      <CommonSkeleton />
    ) : (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 order-1 xl:order-2 xl:col-span-3">
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
              action="#" className="space-y-10 my-4 z-2"
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

      <div className="col-span-5 order-2 xl:oreder-1 xl:col-span-2">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("photo")}</Title>
          </div>
          <div className="px-7 py-4">
            {errorImg != "" ? (
              <Alert color="danger" message={errorImg} />
            ) : null}
            {successImg != "" ? (
              <Alert color="success" message={successImg} />
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
                    <button className="hover:text-danger" onClick={handleDeleteProfilePic} disabled={!user?.image}>
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
      </div>

      <div className="col-span-5 order-3">
        <div className="rounded-sm border border-divider bg-background shadow-default">
          <div className="border-b border-divider px-7 py-4">
            <Title className="font-medium text-foreground">{t_settings("security_informations")}</Title>
          </div>
          <div className="px-7 py-4">
            {errorPwd != "" ? (
              <Alert color="danger" message={errorPwd} />
            ) : null}
            {successPwd != "" ? (
              <Alert color="success" message={successPwd} />
            ) : null}
            <form
              action="#" className="space-y-10 mt-10 mb-4"
              onSubmit={handleChangePassword}
            >
              <Input
                label={t("current_password")}
                labelPlacement="outside"
                variant="bordered"
                placeholder={t("current_password_placeholder")}
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
                onChange={(e) => setCurrent_password(e.target.value)}
              />
              <Input
                label={t("password")}
                labelPlacement="outside"
                variant="bordered"
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
                // onChange={(e) => setPassword(e.target.value)}
                value={password}
                isInvalid={isInvalid}
                color={isInvalid ? "danger" : "default"}
                errorMessage="Please enter a valid email"
                onValueChange={setPassword}
              />

              <div className="mb-6 text-base" role="alert">
                <span className="font-medium">{t_requirements("pwd_label")}</span>
                <ul className="mt-1.5 ml-4 list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li>{t_requirements("pwd_1")}</li>
                  <li>{t_requirements("pwd_2")}</li>
                  <li>{t_requirements("pwd_3")}</li>
                </ul>
              </div>

              <div className="w-full -mt-12">
                <Button 
                  type="submit"
                  color="primary"
                  isLoading={loadingPwd}
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

