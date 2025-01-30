import ECommerce from "@/components/admin/dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | BB-RESERVATION-SYST",
  description: "Dashboard BB-Reservation-Syst",
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
