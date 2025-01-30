import { Metadata } from "next";
import ForgotPassword from "@/components/auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot-password | BB-RESERVATION-SYST",
  description:
    "forgot password page",
};


const ForgotPasswordPage = () => {
  return (
    <ForgotPassword />
  )
};

export default ForgotPasswordPage;
