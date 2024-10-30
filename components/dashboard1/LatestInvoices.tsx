import clsx from 'clsx';
import { Image } from "@nextui-org/react";
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Title from "@/components/Title";
import { fetchLatestInvoices } from '@/lib/data';

export default function LatestInvoices() {
  const latestInvoices = fetchLatestInvoices();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <Title className="mb-4 text-base">Latest Invoices</Title>
      <div className="flex flex-col justify-between rounded-xl bg-default/50 p-4">
        <div className="bg-background px-6">
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex gap-x-3 items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full shrink-0"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p className="hidden text-sm text-foreground/50 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className="truncate text-sm font-medium"
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-foreground" />
          <h3 className="ml-2 text-sm text-foreground">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
