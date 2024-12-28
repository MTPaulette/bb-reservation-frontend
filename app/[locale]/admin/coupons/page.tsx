import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import CouponsTable from "@/components/admin/Lists/Coupons";

export const metadata: Metadata = {
  title: "Coupons | BB-RESERVATION-SYST",
  description:
    "Show all coupons of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="coupons" />
      <CouponsTable />
    </>
  )
};

export default TablesPage;
