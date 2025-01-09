import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Space not found | BB-RESERVATION-SYST",
  description:
    "The Space is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="space_not_found" />
  );
}
