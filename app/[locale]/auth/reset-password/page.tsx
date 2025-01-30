import { Metadata } from "next";
import Reset from "@/components/auth/ResetPassword";

export const metadata: Metadata = {
  title: "Reset | BB-RESERVATION-SYST",
  description:
    "reset page",
};


const ResetPasswordPage = () => {
  return (
    <Reset />
  )
};

export default ResetPasswordPage;
