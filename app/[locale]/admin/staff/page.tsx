import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import StaffTable from "@/components/admin/lists/Staff";

export const metadata: Metadata = {
  title: "Staff | BB-RESERVATION-SYST",
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
