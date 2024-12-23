import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import PaymentsTable from "@/components/admin/Lists/Payments";

export const metadata: Metadata = {
  title: "Payments",
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
