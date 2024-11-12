"use client"

import React from "react";
import { Button, Input, Link} from "@nextui-org/react";
import { EnvelopIcon, EyeIcon, EyeSlashIcon, UserIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { UserType } from "@/lib/definitions";


type TSignInForm = {
  lastname: string,
  firstname: string,
  email: string,
  password: string
}

export default function DeleteClient({ user }: { user: UserType} ) {

  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();

  const schema: ZodType<TSignInForm> = z
    .object({
      lastname: z.string().min(1, { message: t_error("lastname") }),
      firstname: z.string().min(1, { message: t_error("firstname") }),
      email: z.string().email({
        message:  t_error("email"),
      }),
      password: z
      .string()
      .min(8, { message: t_error("passwordLenght")})
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
        message: t_error("password")
      }),
  });

  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: TSignInForm) => {
    setError("")
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          //"Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      })
      if(response.ok){
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        })
        .then((res) => {
          setLoading(false);
          if(res?.ok) {
            // router.push('/fr/dashboard1');
            router.push(`/${locale}/dashboard1`);
          } else {
            if(res?.error === "CredentialsSignin"){
              setError(t_error("invalid_credentials"));
            } else {
              setError(t_error("invalid_credentials"));
            }
          }
        })
        .catch(err => {
          console.log("login error: ");
          console.log(err);
        })


      } else {
        const res = await response.json()
        setError(res.errors.email[0]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(t_error("invalid_credentials"));
      console.log(err);
    }
  }

  return (
    <>
    <div className="w-full">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) : null}
    <h1 className="flex flex-col gap-1 my-2 capitalize">{t("register")}</h1>
    {/* {JSON.stringify(user, null, 2)} */}
    <div className="flex gap-2.5 w-full justify-end">
      <Button color="primary" variant="solid">
        Delete
      </Button>
      <Button color="danger" variant="solid">
      {/* <Button color="default" variant="flat" onPress={() => {onClose ; close()}}> */}
        {t("cancel")}
      </Button>
    </div>
    </div>
    </>
  )
}

