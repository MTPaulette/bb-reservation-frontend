import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewSpace from "@/components/admin/View/Space";

export const metadata: Metadata = {
  title: "Space | BB-RESERVATION-SYST",
  description:
    "See more about the space",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="space" />
        <ViewSpace id={id} />
      </div>
    </>
  );
};