"use client"

import React from "react";
import { Button, Checkbox, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, ZodType } from "zod"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation";
import Alert from "@/app/components/Alert";

type TSignInForm = {
  email: string
  password: string
}

const schema: ZodType<TSignInForm> = z
  .object({
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z.string().min(1, { message: "the password is required" }),
  });

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const query = useSearchParams();

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
    await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
    })
    .then((res) => {
      setLoading(false);
      if(res?.ok) {
        router.push(query.get("callbackUrl"));
      } else {
        if(res?.error === "CredentialsSignin"){
          setError("Invalid credentials.")
        } else {
          setError("Something went wrong.")
        }
      }
    })
    .catch(err => {
      console.log("login error: ");
      console.log(err);
    })
  }

  return (
    <>
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) : null}
    <h1 className="flex flex-col gap-1">Log in</h1>
    <form
      action="#" className="space-y-3"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        autoFocus
        endContent={
          <EnvelopeIcon className="w-4" />
        }
        label="Email"
        type="email"
        placeholder="Enter your email"
        variant="bordered"
        {...register("email")}
        isInvalid={errors.email ? true: false}
        errorMessage={errors.email ? errors.email?.message: null}
      />
      <Input
        label="Password"
        variant="bordered"
        placeholder="Enter your password"
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
            {isVisible ? (
              <EyeSlashIcon className="w-4" />
            ) : (
              <EyeIcon className="w-4" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        {...register("password")}
        isInvalid={errors.password ? true: false}
        errorMessage={errors.password ? errors.password?.message: null}
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox
          classNames={{
            label: "text-small",
          }}
        >
          Remember me
        </Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      <div className="w-full">
        <Button 
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full"
        >
          Sign in
        </Button>
      </div>
    </form>
    </>
  )
}

