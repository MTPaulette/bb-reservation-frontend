import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Role not found | BB-RESERVATION-SYST",
  description:
    "The Role is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="role_not_found" />
  );
}
