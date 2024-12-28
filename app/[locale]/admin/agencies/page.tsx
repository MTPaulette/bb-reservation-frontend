import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import AgenciesTable from "@/components/admin/Lists/Agencies";

export const metadata: Metadata = {
  title: "Agencies | BB-RESERVATION-SYST",
  description:
    "Show all agencies of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="agencies" />
      <AgenciesTable />
    </>
  )
};

export default TablesPage;
