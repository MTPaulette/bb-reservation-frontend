import { Metadata } from "next";
import Forbidden from '@/components/Forbidden';

export const metadata: Metadata = {
  title: "403-forbidden | BB-RESERVATION-SYST",
  description:
    "403-forbidden",
};

export default function ForbiddenPage() {

  return (
    <Forbidden />
  );
}
