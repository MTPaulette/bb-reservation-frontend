import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Client not found | BB-RESERVATION-SYST",
  description:
    "The Client is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="client_not_found" />
  );
}
