import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 Agency not found",
  description:
    "The Agency is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="agency_not_found" />
  );
}
