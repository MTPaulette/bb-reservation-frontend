import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import PaymentsTable from "@/components/admin/lists/Payments";

export const metadata: Metadata = {
  title: "Payments | BB-RESERVATION-SYST",
  description:
    "Show all payments of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="payments" />
      <PaymentsTable />
    </>
  )
};

export default TablesPage;
