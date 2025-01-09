import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Ressource not found | BB-RESERVATION-SYST",
  description:
    "The Ressource is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="ressource_not_found" />
  );
}
