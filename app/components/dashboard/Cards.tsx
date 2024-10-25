import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  ressources: ShoppingBagIcon,
};

export default function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = fetchCardData();

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card
        title="Total Customers customers"
        value={numberOfCustomers}
        type="customers"
      />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Ressources" value={totalPendingInvoices} type="ressources" />
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
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'ressources';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-default/50 p-2 before:shadow-sm">
    {/* 
    <div
    className={`rounded-xl bg-default/50 p-2 before:shadow-sm
      ${type === "customers"? "text-blue-800 border-blue-300 bg-blue-50 dark:bg-blue-900/10 dark:text-blue-300 dark:border-blue-800" : " "}
      ${type === "ressources"? "text-purple-800 border-purple-300 bg-purple-50 dark:bg-purple-900/10 dark:text-purple-300 dark:border-purple-800" : " "}
      ${type === "pending"? "text-yellow-800  border-yellow-300 bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-300 dark:border-yellow-800" : " "}
      ${type === "invoices"? "text-red-800  border-red-300 bg-red-50 dark:bg-red-900/10 dark:text-red-300 dark:border-red-800" : " "}
      ${type === "collected"? "text-green-800  border-green-300 bg-green-50 dark:bg-green-900/10 dark:text-green-300 dark:border-green-800" : " "}
    `}
    > */}
      <div className="flex p-3 w-full">
        {Icon ? <Icon className="h-5 w-5 text-foreground shrink-0 text-inherit" /> : null}
        <h3 className="ml-2 text-sm font-medium whitespace-nowrap truncate">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-background px-2 py-4 text-center text-xl font-medium">
        {value}
      </p>
    </div>
  );
}
