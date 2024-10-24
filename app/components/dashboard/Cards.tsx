import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';

import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers customers"
        value={numberOfCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-default/50 p-2 before:shadow-sm">
      <div className="flex p-3 w-full ">
        {Icon ? <Icon className="h-5 w-5 text-foreground shrink-0" /> : null}
        <h3 className="ml-2 text-sm font-medium whitespace-nowrap truncate">{title}</h3>
        {/* <h3 className="font-semibold text-foreground/90 h-[20px] truncate mt-1 md:mt-2 w-full whitespace-normal">{title}</h3> */}
      </div>
      <p className="truncate rounded-xl bg-background px-2 py-5 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
