import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import RolesTable from "@/components/admin/lists/Roles";

export const metadata: Metadata = {
  title: "Roles | BB-RESERVATION-SYST",
  description:
    "Show all possible roles in system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="roles" />
      <RolesTable />
    </>
  )
};

export default TablesPage;
