import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import CharacteristicsTable from "@/components/admin/Lists/Characteristics";

export const metadata: Metadata = {
  title: "Characteristics | BB-RESERVATION-SYST",
  description:
    "Show all characteristics of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="characteristics" />
      <CharacteristicsTable />
    </>
  )
};

export default TablesPage;
