import { CurrentReservation } from "@/lib/definitions";
import Title from "@/components/Title";
import { useLocale, useTranslations } from 'next-intl';
import { capitalize, formatCurrency, getUsername } from "@/lib/utils";
import { columnsCurrentReservation as columns } from "@/lib/data";
import Link from "next/link";
import { Chip, ChipProps } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};

export default function CurrentReservations({reservations}: {reservations: CurrentReservation[]}) {
  const locale = useLocale();
  const t_statistic = useTranslations("Statistic");

  return (
    <div className="rounded-sm border border-divider bg-background px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
      <Title className="mb-6 text-xl">{t_statistic("current_reservations")}</Title>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-5 rounded-sm bg-content2 mb-2">
          {columns.map((column) => (
            <div key={column.uid} className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">
                {capitalize(locale === "en" ? column.name_en: column.name_fr)}
              </h5>
            </div>
           ))}
        </div>

      <div className="h-[400px] overflow-y-scroll overflow-x-hidden over-y mb-4">
        {reservations.map((reservation, key) => (
          <Link
            href={`/${locale}/admin/reservations/${reservation.id}`}
            className={`grid grid-cols-3 sm:grid-cols-5 hover:bg-content2/80 hover:!no-underline ${
              key === reservation.length - 1
                ? ""
                : "border-b border-divider"
            }`}
            key={key}
          >
            <div className="p-2.5 xl:p-5">
              <div className="mb-2 font-semibold">
                {capitalize(reservation.ressource.space.name)}
              </div>
              <Chip
                className="capitalize" size="sm" variant="flat"
                color={
                  reservation.state == "partially paid" ? statusColorMap["partially_paid"] : 
                  reservation.state == "totally paid" ? statusColorMap["totally_paid"] : 
                  statusColorMap[reservation.state]
                }
              >
                {reservation.state}
              </Chip>
            </div>

            <div className="text-foreground p-2.5 xl:p-5 truncate">
              {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
            </div>

            <div className="p-2.5 xl:p-5 text-sm whitespace-nowrap">
              <p className="font-semibold text-sm">{`${reservation.start_date}`}</p>
              <p className="font-semibold text-sm">{`${reservation.end_date}`}</p>
              <p className="dark:text-foreground/60">{`(${reservation.start_hour} - ${reservation.end_hour})`}</p>
            </div>

            <div className="text-sm p-2.5 xl:p-5">
              <p className="dark:text-foreground/60">
                {reservation.initial_amount? formatCurrency(reservation.initial_amount): ''}
              </p>
              <div>
                <span className="mr-1.5 text-xs">
                  {t_statistic("left")}:
                </span>
                <span className={`${reservation.amount_due > 0 ? "font-medium text-danger": "font-semibold dark:font-normal"}`}>
                  {reservation.amount_due > 0 ? formatCurrency(reservation.amount_due): "0"}
                </span>
              </div>
            </div>

            <div className="p-2.5 xl:p-5">
              {capitalize(reservation.ressource.agency.name)}
              <p className="text-xs truncate">
                {t_statistic("by")}:
                <span className="font-medium ml-1">
                  {reservation.created_by.firstname && reservation.created_by.lastname ?
                    getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
                </span>
              </p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};
