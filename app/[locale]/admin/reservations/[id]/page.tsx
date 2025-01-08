import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewReservation from "@/components/admin/View/Reservation";

export const metadata: Metadata = {
  title: "Reservation | BB-RESERVATION-SYST",
  description:
    "See more about the reservation",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="reservation" />
        <ViewReservation id={id} />
      </div>
    </>
  );
};