import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Reservation not found",
  description:
    "The Reservation is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="reservation_not_found" />
  );
}
