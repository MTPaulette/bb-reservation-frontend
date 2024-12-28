import Chart from "@/components/admin/Charts/page";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | BB-RESERVATION-SYST",
  description:
    "Dashboard BB-RESERVATION-SYST",
};

const BasicChartPage: React.FC = () => {
  return (
    <>
      <Chart />
    </>
  );
};

export default BasicChartPage;
