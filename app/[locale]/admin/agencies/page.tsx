import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import StaffTable from "@/components/admin/Lists/Staff";

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Show all staff of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="staff" />
      <StaffTable />
    </>
  )
};

export default TablesPage;
