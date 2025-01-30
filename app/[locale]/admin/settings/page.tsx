import { Metadata } from "next";
import Breadcrumb from "@/components/admin/Breadcrumb";
import IndexSettings from "@/components/admin/formElements/settings/Index";

export const metadata: Metadata = {
  title: "Settings | BB-RESERVATION-SYST",
  description:
    "Settings",
};

const SettingsPage = () => {
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="settings" />
        <IndexSettings />
      </div>
    </>
  )
};

export default SettingsPage;
