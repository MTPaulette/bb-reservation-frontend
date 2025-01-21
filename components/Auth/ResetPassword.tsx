"use client"

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';

import Alert from "@/components/Alert";
import { resetPassword } from "@/lib/action/authentication";

type TSignInForm = {
  email: string
  password: string
}

export default function ResetPasswordComponent() {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<TSignInForm> = z
    .object({
      email: z.string().email({
        message: t_error("email"),
      }).max(250),
      password: z.string().min(1, { message: t_error("passwordLenght") }).max(50),
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [token, setToken] = useState<string|null>();
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: TSignInForm) => {
    setError("");
    setLoading(true);
    const token = searchParams.get("token")? searchParams.get('token'): '';
    resetPassword(data.email, data.password, token? token: "")
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        setSuccess(t("reset_password_success_msg"));
        setTimeout(() => {
          router.push(`/${locale}/auth/login`);
        }, 500);
      } else {
        const err = await res.json();
        setError(JSON.stringify(err.errors));
      }
    })
    .catch(error => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  }

  return (
    <div className="w-[270px] md:w-[350px]">
      <h1 className="mb-2 capitalize font-semibold">{t("reset_password")}</h1>
      <p className="mb-3 font-medium text-foreground dark:font-normal dark:text-foreground/60 text-sm text-justify">
        {t("reset_password_description")}
      </p>
      {success != "" ? (
        <div className="mb-4">
          <Alert color="success" message={success} />
        </div>
      ) : null}
      {error != "" ? (
        <div className="mb-4">
          <Alert color="danger" message={error} />
        </div>
      ) : null}
      <form
        action="#" className="space-y-6"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input
          autoFocus
          endContent={
            <EnvelopIcon fill="currentColor" size={18} />
          }
          label={t("email")}
          type="email"
          placeholder={t("email_placeholder")}
          variant="bordered"
          {...register("email")}
          isInvalid={errors.email ? true: false}
          errorMessage={errors.email ? errors.email?.message: null}
        />
        <Input
          label={t("password")}
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
          {...register("password")}
          isInvalid={errors.password ? true: false}
          errorMessage={errors.password ? errors.password?.message: null}
        />
        <div className="w-full">
          <Button 
            type="submit"
            color="primary"
            isLoading={loading}
            className="w-full"
          >
            {t("reset")}
          </Button>
        </div>
      </form>
      {/* <p className="mt-2 text-sm font-light text-foreground/60 dark:font-extralight dark:text-foreground">
        {t("create_account")}
        <Link
          color="primary"
          href={`/${locale}/auth/register`}
          size="sm"
          className="capitalize ml-2"
        >
          {t("register")}
        </Link>
      </p> */}
    </div>
  )
}
