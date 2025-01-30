import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewClient from "@/components/admin/view/user/Client";

export const metadata: Metadata = {
  title: "Client Profile | BB-RESERVATION-SYST",
  description:
    "See more about client",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="client" />
        <ViewClient id={id} />
      </div>
    </>
  );
};