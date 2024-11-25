import Title from "@/components/Title";
import { ArrowUpIcon, ArrowDownIcon, CloseIcon, CharetIcon, CheckCircleIcon, CurrencyIcon, PeopleIcon, ExclamationCircleIcon } from "../../Icons";

const iconMap = {
  "pending": CharetIcon,
  "partially paid": CheckCircleIcon,
  "confirmed": CheckCircleIcon,
  "totally paid": CurrencyIcon,
  "cancelled": CloseIcon,
  "users": PeopleIcon,
};

export default function CardWrapper2() {
  const numberOfInvoices = "3000";
  const numberOfCustomers = "450";
  const totalPaidInvoices = "89";
  const totalPendingInvoices = "56";

  return (
    <>
      <Card title="Collected" total={totalPaidInvoices} type="pending" rate="0.43%" levelUp />
      <Card title="Pending" total={totalPendingInvoices} type="partially paid" rate="5.9%" levelUp />
      <Card title="Total Customers customers" total={numberOfCustomers} type="confirmed" rate="53.8%" levelDown />
      <Card title="Total Invoices" total={numberOfInvoices} type="totally paid" rate="0.43%" levelUp />
      <Card title="Total Ressources" total={totalPendingInvoices} type="cancelled" rate="9.73%" levelDown />
      <Card title="Total administrators" total={totalPendingInvoices} type="users" rate="9.73%" levelDown />
    </>
  );
}

export function Card({
  title,
  total,
  type,
  rate,
  levelUp,
  levelDown,
}: {
  title: string;
  total: string;
  type: "pending" | "partially paid" | "confirmed" | "totally paid" | "cancelled" | "users";
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-sm border border-divider bg-background px-3.5 py-2 sm:px-5.5 sm:py-4 shadow-sm shadow-default">
      <div className=" flex items-end justify-between">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {/* {children} */}
          {Icon ? 
            <span>
              <Icon fill="currentColor" size={24} />
            </span> : null}
        </div>
        <span
        className={`flex items-center gap-1 text-sm font-medium ${
          levelUp && "text-meta-3"
        } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <span className="fill-meta-3">
              <ArrowUpIcon fill="currentColor" size={16} />
            </span>
          )}
          {levelDown && (
            <span className="fill-meta-5">
              <ArrowDownIcon fill="currentColor" size={16} />
            </span>
          )}
        </span>
      </div>

      <div className="mt-4 flex flex-col w-full items-start justify-start">
        <Title className="text-lg sm:text-2xl font-bold">{total}</Title>
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
  )
}