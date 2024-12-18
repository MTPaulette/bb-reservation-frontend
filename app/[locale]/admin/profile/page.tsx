import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewProfile from "@/components/admin/View/User/Profile";

export const metadata: Metadata = {
  title: "My Profile",
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