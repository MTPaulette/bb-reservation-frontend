import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import SpacesTable from "@/components/admin/Lists/Spaces";

export const metadata: Metadata = {
  title: "Spaces",
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
