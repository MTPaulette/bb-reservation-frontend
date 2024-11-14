import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewClient from "@/components/admin/View/User/Client";

export const metadata: Metadata = {
  title: "User Profile",
  description:
    "See more about user",
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