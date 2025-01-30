import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import ReservationsTable from "@/components/admin/lists/Reservations";

export const metadata: Metadata = {
  title: "Reservations | BB-RESERVATION-SYST",
  description:
    "Show all reservations of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="reservations" />
      <ReservationsTable />
    </>
  )
};

export default TablesPage;
