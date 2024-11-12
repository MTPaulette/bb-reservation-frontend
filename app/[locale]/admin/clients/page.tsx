import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import ClientsTable from "@/components/admin/Lists/Clients";

export const metadata: Metadata = {
  title: "Clients",
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
