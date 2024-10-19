"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z, ZodType } from "zod"
import { useEffect, useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"

type TSignInForm = {
  email: string
  password: string
}

const schema: ZodType<TSignInForm> = z
  .object({
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z.string(), //.min(5, { message: "password at least 5 characters" }),
  })

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(false)
  const [err, setErr] = useState(false)
  const message =
    toast && !err
      ? "Your registration was successful."
      : "An error occurred while processing your request."

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignInForm>({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: TSignInForm) => {
    console.log(data);
    /* */
    try {
      setErr(false)
      setToast(false)
      await signIn("credentials", { callbackUrl: "/dashboard"});
      // console.log("signinressult");
      // console.log(signinressult)
    } catch (e) {
      setErr(true)
      setToast(true)
    }
  }

  useEffect(() => {
    if (setToast) {
      const timer = setTimeout(() => {
        setToast(false)
        setErr(false)
      }, 5000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [toast])

  return (
    <div className="font-sans antialiased bg-grey-lightest h-screen">
      <div className="w-full bg-grey-lightest" style={{ paddingTop: "4rem" }}>
        <div className="container mx-auto py-8">
          <div className="w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow">
            {toast && (
              <div
                className={`flex justify-between py-4 px-8 ${
                  err
                    ? "bg-[#fad2e1]  text-[#7c193d]"
                    : "bg-[#98f5e1]  text-[#236c5b"
                }]`}
              >
                <p className="font-sans">{message}</p>
                <button className="font-bold">&#10005;</button>
              </div>
            )}
            <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
              Sign in
            </div>
            <form
              className="py-4 px-8"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                  id="password"
                  type="password"
                  placeholder="Your secure password"
                  {...register("password")}
                />
                {errors.password ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-between mt-8">
                <button
                  className="bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => console.log("eer")}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <p className="text-center my-4">
            <Link
              href="/auth/api/login"
              className="text-grey-dark text-sm no-underline hover:text-grey-darker"
            >
              I already have an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
export default LoginPage

/*
const handleFormSubmit = async (data: TSignInForm) => {
  try {
    setErr(false)
    setToast(false)
    const response = await fetch("http://127.0.0.1:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const res = await response.json()
    if (res.status) {
      setToast(true)
    }
    setLoading(false)
    reset()
  } catch (e) {
    setErr(true)
    setToast(true)
  }
}
  */