import { Metadata } from "next";
import Login from "@/components/Auth/Login";

export const metadata: Metadata = {
  title: "Login | BB-RESERVATION-SYST",
  description:
    "login page",
};


const LoginPage = () => {
  return (
    <Login />
  )
};

export default LoginPage;
