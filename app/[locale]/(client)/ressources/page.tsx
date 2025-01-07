import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import RessourcesTable from "@/components/admin/Lists/Ressources";

export const metadata: Metadata = {
  title: "Ressources | BB-RESERVATION-SYST",
  description:
    "Show all ressources of system",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="ressources" />
      <RessourcesTable />
    </>
  )
};

export default TablesPage;
