import NotFound from '@/components/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "404 coupon not found | BB-RESERVATION-SYST",
  description:
    "The coupon is not found ",
};

export default function NotFoundPage() {
  return (
    <NotFound title="coupon_not_found" />
  );
}
