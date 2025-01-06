import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import Calendar from "@/components/admin/Calendar";

export const metadata: Metadata = {
  title: "Calendar | BB-RESERVATION-SYST",
  description:
    "Show the calendar",
};

const CalendarPage = () => {
  return (
    <>
      <Breadcrumb pageName="calendar" />
      <Calendar />
    </>
  )
};

export default CalendarPage;
