import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 user not found | BB-RESERVATION-SYST",
  description:
    "The user is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="user_not_found" />
  );
}
