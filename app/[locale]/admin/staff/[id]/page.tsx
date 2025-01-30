import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewStaff from "@/components/admin/view/user/Staff";

export const metadata: Metadata = {
  title: "Staff Profile | BB-RESERVATION-SYST",
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