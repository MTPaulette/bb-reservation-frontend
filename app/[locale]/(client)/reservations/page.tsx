import { Metadata } from "next";
import Reservations from "@/components/reservations/Index";

export const metadata: Metadata = {
  title: "BB-RESERVATION-SYST",
  description:
    "BB-RESERVATION-SYST",
};

const ReservationsDefaultPage = () => {
  return (
    <>
      <Reservations />
    </>
  )
};

export default ReservationsDefaultPage;
