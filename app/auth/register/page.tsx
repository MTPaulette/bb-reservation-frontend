"use client"

import React from "react";
import { Button, Input, Link} from "@nextui-org/react";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, UserIcon } from '@heroicons/react/24/outline';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert";

type TSignInForm = {
  email: string
  password: string
}

const schema: ZodType<TSignInForm> = z
  .object({
    name: z.string().min(1, { message: "the username is required" }),
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, {
      message:
        "Password must contain at least one number and one special character",
    }),
  });

export default function RegisterPage() {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if(response.ok){
        router.push("/auth/login");
      } else {
        const res = await response.json()
        console.log("====================================");
        console.log(res.errors.email[0]);
        setError(res.errors.email[0]);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong.");
      console.log(err);
    }
  }

  return (
    <>
    <div className="max-w-xs">
    {error != "" ? (
      <Alert color="danger" message={error} />
    ) : null}
    <h1 className="flex flex-col gap-1 my-2">Register</h1>
    <form
      action="#" className="space-y-3"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Input
        autoFocus
        endContent={
          <UserIcon className="w-4" />
        }
        label="Name"
        type="text"
        placeholder="Enter your name"
        variant="bordered"
        {...register("name")}
        isInvalid={errors.name ? true: false}
        errorMessage={errors.name ? errors.name?.message: null}
      />
      <Input
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
      <div className="w-full">
        <Button 
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full"
        >
          Register
        </Button>
      </div>
    </form>
    <div className="flex justify-end mt-2">
      <Link color="primary" href="/auth/login" size="sm">
        You already have an account ? Sign in
      </Link>
    </div>
    </div>
    </>
  )
}

