"use client";

import { CouponType } from '@/lib/definitions';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import { Chip } from "@nextui-org/react";
import Title from '../Title';
import { useLocale, useTranslations } from 'next-intl';

export function CouponCard({coupon} :{ coupon: CouponType }) {
  const locale = useLocale();
  const t_coupon = useTranslations("Coupon");

  return (
    <div className="w-full bg-background rounded-md shadow-card">
    <div className="w-full text-sm p-4 bg-green-100/40 dark:bg-success/35 rounded-md">
      <Title className="font-semibold text-lg mb-2">{t_coupon("discount_coupon")}</Title>
      <dl className="w-full flex items-center justify-between">
        <dt className="font-semibold">{t_coupon("name")}</dt>
        <dd className="text-foreground/60">{coupon.name}</dd>
      </dl>
      <dl className="w-full flex items-center justify-between">
        <dt className="font-semibold">{t_coupon("code")}</dt>
        <dd className="font-medium">{coupon.code}</dd>
      </dl>
      {coupon.amount ? (
        <dl className="w-full flex items-center justify-between">
        <dt className="font-semibold">{t_coupon("amount")}</dt>
          <dd className="text-foreground/60">{formatCurrency(coupon.amount)}</dd>
        </dl>
      ): (
        <dl className="w-full flex items-center justify-between">
          <dt className="font-semibold">{t_coupon("percent")}</dt>
          <dd className="text-foreground/60">{coupon.percent} %</dd>
        </dl>
      )}
      <dl className="w-full flex items-center justify-between mt-2">
        <dt className="font-semibold">{t_coupon("type")}</dt>
        <dd className="text-success/60">
          <Chip
            className="capitalize border-none gap-1 text-xs truncate"
            color={coupon.is_public ? "primary" : "default"}
            size="sm"
            variant="flat"
          >
            {locale == "en" ? (
              <>{coupon.is_public ? "public coupon" : "private coupon"}</>
            ) : (
              <>{coupon.is_public ? "coupon publique" : "coupon privé"}</>
            )}
          </Chip>
        </dd>
      </dl>
      <dl className="mt-2">
        <dt className="mb-1 font-semibold">{t_coupon("coupon_usage")}</dt>
        <dd className="flex items-center space-x-4 text-foreground/60">
          <div className="flex flex-shrink-0 h-8 w-8 items-center justify-center rounded-full bg-green-400">
            <span className="text-xs font-medium text-black">
              {" "}
              {coupon.total_usage}
            </span>
          </div>
          <div>
            <p className="font-normal text-foreground/60">{t_coupon("total_usage")}</p>
            <p className="text-sm flex justify-between gap-x-3 font-medium dark:font-normal text-danger">
              {t_coupon("expired_on")} {formatDateTime(coupon.expired_on)}
            </p>
          </div>
        </dd>
      </dl>
    </div>
    </div>
  );
}
