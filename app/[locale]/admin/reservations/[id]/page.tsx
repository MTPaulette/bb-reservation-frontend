import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewRessource from "@/components/admin/View/Ressource";

export const metadata: Metadata = {
  title: "Ressource",
  description:
    "See more about the ressource",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="ressource" />
        <ViewRessource id={id} />
      </div>
    </>
  );
};