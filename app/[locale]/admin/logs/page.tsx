import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import LogsTable from "@/components/admin/Lists/Logs";

export const metadata: Metadata = {
  title: "Logs | BB-RESERVATION-SYST",
  description:
    "Show all logs of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="logs" />
      <LogsTable />
    </>
  )
};

export default TablesPage;
