"use client";

import { PaymentType } from '@/lib/definitions';
import { formatCurrency, formatDateTime, getUsername } from '@/lib/utils';
import { Image } from "@nextui-org/react";
import Title from '../Title';
import { useTranslations } from 'next-intl';
import { CurrencyIcon } from '../Icons';

export function PaymentCard({payment} :{ payment: PaymentType }) {
  const t_payment = useTranslations("Payment");

  return (
    <div className="w-full text-sm p-4 bg-background rounded-md shadow-card">
      <Title className="font-semibold text-lg mb-2">{t_payment("payment_details")}</Title>
      <dl className="w-full flex items-center justify-between">
        <dt className="font-semibold">{t_payment("amount")}</dt>
        <dd className="text-success/60">{formatCurrency(payment.amount)}</dd>
      </dl>
      {payment.transaction_id ? (
        <dl className="w-full flex items-center justify-between">
          <dt className="font-semibold">{t_payment("transaction_id")}</dt>
          <dd className="text-foreground/60">{payment.transaction_id}</dd>
        </dl>
      ): null }
      {payment.bill_number ? (
        <dl className="w-full flex items-center justify-between">
          <dt className="font-semibold">{t_payment("bill_number")}</dt>
          <dd className="text-foreground/60">{payment.bill_number}</dd>
        </dl>
      ): null }
      <dl className="w-full flex items-center justify-between">
        <dt className="font-semibold">{t_payment("staff")}</dt>
        <dd className="text-foreground/60 truncate text-xs">{payment.processed_by ? getUsername(payment.processed_by.lastname, payment.processed_by.firstname): ""}</dd>
      </dl>
      <dl className="mt-2">
        <dt className="mb-1 font-semibold">{t_payment("payment_method")}</dt>
        <dd className="flex items-center space-x-4 text-foreground/60">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-content2">
            <Image
              width={16}
              height={16}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
              className="h-4 w-auto"
            />
            {/* <CurrencyIcon fill="currentColor" size={20} /> */}
          </div>
          <div>
            <div className="text-sm">
              <p className="mb-0.5 font-medium text-foreground/60">{payment.payment_method}</p>
              <p className="font-normal text-foreground/60">{t_payment("at")} {formatDateTime(payment.created_at)}</p>
            </div>
          </div>
        </dd>
      </dl>
    </div>
  );
}
