import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewStaff from "@/components/admin/View/User/Staff";

export const metadata: Metadata = {
  title: "Staff Profile",
  description:
    "See more about staff",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="staff" />
        <ViewStaff id={id} />
      </div>
    </>
  );
};