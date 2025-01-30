import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import ClientsTable from "@/components/admin/lists/Clients";

export const metadata: Metadata = {
  title: "Clients | BB-RESERVATION-SYST",
  description:
    "Show all clients of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="clients" />
      <ClientsTable />
    </>
  )
};

export default TablesPage;
