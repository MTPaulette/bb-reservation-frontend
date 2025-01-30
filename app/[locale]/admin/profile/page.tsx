import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewProfile from "@/components/admin/view/user/Profile";

export const metadata: Metadata = {
  title: "My Profile | BB-RESERVATION-SYST",
  description:
    "See more about me",
};


export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="profile" />
        <ViewProfile />
      </div>
    </>
  );
};