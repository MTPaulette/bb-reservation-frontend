import { ArrowUpIcon, ArrowDownIcon, CloseIcon, CharetIcon, CheckCircleIcon, CurrencyIcon, ExclamationCircleIcon } from "../../Icons";

const iconMap = {
  "sollicit": CharetIcon,
  "partially payed": CheckCircleIcon,
  "confirmed": CheckCircleIcon,
  "totally payed": CurrencyIcon,
  "cancelled": CloseIcon,
};

export default function CardWrapper2() {
  const numberOfInvoices = "3000";
  const numberOfCustomers = "450";
  const totalPaidInvoices = "89";
  const totalPendingInvoices = "56";

  return (
    <>
      <Card title="Collected" total={totalPaidInvoices} type="sollicit" rate="0.43%" levelUp />
      <Card title="Pending" total={totalPendingInvoices} type="partially payed" rate="5.9%" levelUp />
      <Card title="Total Customers customers" total={numberOfCustomers} type="confirmed" rate="53.8%" levelDown />
      <Card title="Total Invoices" total={numberOfInvoices} type="totally payed" rate="0.43%" levelUp />
      <Card title="Total Ressources" total={totalPendingInvoices} type="cancelled" rate="9.73%" levelDown />
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
  type: "sollicit" | "partially payed" | "confirmed" | "totally payed" | "cancelled";
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
}) {
  const Icon = iconMap[type];

  return (
    <>
  <div
    className={`
      ${type === "sollicit"? "text-meta-6" : " "}
      ${type === "partially payed"? "text-meta-4" : " "}
      ${type === "confirmed"? "text-meta-5" : " "}
      ${type === "totally payed"? "text-meta-3" : " "}
      ${type === "cancelled"? "text-meta-1" : " "}
  `}>
    <div className="text-foreground">
      {Icon ? 
        <span>
          <Icon fill="currentColor" size={24} />
        </span> : null}
      <h3 className="my-2 truncate">Total {type}</h3>
    </div>
    <span className="flex gap-2 items-center text-xl font-bold truncate">
      {total}
      <span
        className={`text-xs font-medium flex gap-0.5 items-center rounded px-2 py-0.5
          ${levelUp && "text-meta-3 bgg-green-100 dark:bgg-green-900"}
          ${levelDown && "text-meta-1 bgg-red-100 dark:bgg-red-900"} `}
      >
        {levelUp && (
          <ArrowUpIcon fill="currentColor" size={16} />
        )}
        {levelDown && (
          <ArrowDownIcon fill="currentColor" size={16} />
        )}
        {rate}
      </span>
    </span>
    <p className="mt-2 flex gap-1 items-center text-xs sm:text-sm truncate text-foreground/60">
      <ExclamationCircleIcon fill="currentColor" size={16} />
      vs 1 last 3 months
    </p>
  </div>
  </>
  )
}