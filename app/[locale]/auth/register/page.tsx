import { Metadata } from "next";
import Register from "@/components/auth/Register";

export const metadata: Metadata = {
  title: "Register | BB-RESERVATION-SYST",
  description:
    "register page",
};


const RegisterPage = () => {
  return (
    <Register />
  )
};

export default RegisterPage;
