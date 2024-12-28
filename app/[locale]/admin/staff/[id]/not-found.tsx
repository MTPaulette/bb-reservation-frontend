import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 User not found | BB-RESERVATION-SYST",
  description:
    "The User is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="staff_not_found" />
  );
}
