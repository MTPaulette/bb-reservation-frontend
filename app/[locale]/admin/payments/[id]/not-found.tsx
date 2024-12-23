import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 payment not found",
  description:
    "The payment is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="payment_not_found" />
  );
}
