import Breadcrumb from "@/components/admin/Breadcrumb";
import { Metadata } from "next";
import ViewStaff from "@/components/admin/View/User/Staff";

export const metadata: Metadata = {
  title: "Agency",
  description:
    "See more about the agency",
};


export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  /*
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]); 
  <Form invoice={invoice} customers={customers} /> 
  if (!user) {
    notFound();
  }
  */

  return (
    <>
      <div className="mx-auto max-w-242.5">
        <Breadcrumb pageName="agency" />
        <ViewStaff id={id} />
      </div>
    </>
  );
};