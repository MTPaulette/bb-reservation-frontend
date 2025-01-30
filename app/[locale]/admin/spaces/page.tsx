import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import SpacesTable from "@/components/admin/lists/Spaces";

export const metadata: Metadata = {
  title: "Spaces | BB-RESERVATION-SYST",
  description:
    "Show all spaces of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="spaces" />
      <SpacesTable />
    </>
  )
};

export default TablesPage;
