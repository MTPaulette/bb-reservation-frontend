import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewAgency from "@/components/admin/View/Agency";

export const metadata: Metadata = {
  title: "Agency | BB-RESERVATION-SYST",
  description:
    "See more about the agency",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="agency" />
        <ViewAgency id={id} />
      </div>
    </>
  );
};