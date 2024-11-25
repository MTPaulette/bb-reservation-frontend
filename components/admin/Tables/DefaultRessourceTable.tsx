"use client"

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ChipProps} from "@nextui-org/react";
import { useLocale } from 'next-intl';
import { validitiesName as validities } from "@/lib/data";
import { capitalize, formatCurrency } from "@/lib/utils";
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  suspended: "danger",
};


export default function DefaultRessourceTable({ columns, ressources }: { columns: any[], ressources: any[] }) {
  type Ressource = typeof ressources[0];
  const locale = useLocale();
  const renderCell = React.useCallback((ressource: Ressource, columnKey: React.Key) => {
    const cellValue = ressource[columnKey as keyof Ressource];

    switch (columnKey) {
      case "space":
        return (
          <Link href={`/${locale}/admin/spaces/${ressource.space_id}`} className="font-semibold">
            {capitalize(ressource.space)}
          </Link>
        );
      case "price":
        return (
          <div className="flex flex-col gap-1">
            <p>
              {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
              <span className="font-bold pl-2 text-xs">{ressource.price_hour? formatCurrency(ressource.price_hour) : ""}</span>
            </p>
            <p className="whitespace-nowrap">
              {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
              <span className="font-bold pl-2 text-xs">{ressource.price_midday? formatCurrency(ressource.price_midday) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
              <span className="font-bold pl-2 text-xs">{ressource.price_day? formatCurrency(ressource.price_day) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
              <span className="font-bold pl-2 text-xs">{ressource.price_week? formatCurrency(ressource.price_week) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
              <span className="font-bold pl-2 text-xs">{ressource.price_month? formatCurrency(ressource.price_month) : ""}</span>
            </p>
          </div>
        );
      case "agency":
        return (
          <Link href={`/${locale}/admin/agencies/${ressource.agency_id}`}>
            {capitalize(ressource.agency)}
          </Link>
        );
      case "lastname":
        return (
          <div>
            <Link href={`/${locale}/admin/staff/${ressource.id}`} className="font-bold mb-1">
              {ressource.lastname}
            </Link>
            <p className="text-sm text-foreground/60">{ressource.firstname}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[ressource.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["h-full", "over-x", "!shadow-none", "!border-none", "!p-0", "!m-0"],
      th: ["bg-transparent", "border-b", "border-divider"],
      td: [
        "font-light", "text-sm",
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        // "border-b", "border-divider"
      ],
    }),
    [],
  );

  return (
  <Table
    isCompact
    aria-label="bb-reservation table"
    classNames={classNames}
    topContent={
      <div className="w-full flex justify-end">
        <span className="text-default-400 text-small font-semibold bg-content2 px-4 py-1">Total: {ressources.length}</span>
      </div>
    }
  >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {locale === "en" ? column.name_en: column.name_fr}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={ressources}>
        {(ressource) => (
          <TableRow key={ressource.id}>
            {(columnKey) => <TableCell>{renderCell(ressource, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}