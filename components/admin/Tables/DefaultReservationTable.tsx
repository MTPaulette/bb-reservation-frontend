"use client";

import React from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon } from "@/components/Icons";
import { capitalize, getUsername, formatCurrency, formatDateTime } from "@/lib/utils";
import { useLocale, useTranslations } from 'next-intl';
import { validitiesName as validities } from "@/lib/data";
import Link from "next/link";

const INITIAL_VISIBLE_COLUMNS = ["space", "price", "nb_place", "quantity", "created_by", "created_at"];

export default function DefaultReservationTable({ columns, reservations }: { columns: any[], reservations: any[] }) {
  const locale = useLocale();
  const t_table = useTranslations("Table");
  type Reservation = typeof reservations[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "space",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(reservations.length / rowsPerPage);

  // const changeSelectedReservation

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredReservations = [...reservations];

    if (hasSearchFilter) {
      filteredReservations = filteredReservations.filter((reservation) =>
        reservation.lastname.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredReservations;
  }, [reservations, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Reservation, b: Reservation) => {
      const first = a[sortDescriptor.column as keyof Reservation] as number;
      const second = b[sortDescriptor.column as keyof Reservation] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((reservation: Reservation, columnKey: React.Key) => {
    const cellValue = reservation[columnKey as keyof Reservation];

    switch (columnKey) {
      case "space":
        return (
          <Link href={`/${locale}/admin/spaces/${reservation.space_id}`} className="font-semibold">
            {capitalize(reservation.space)}
          </Link>
        );
      case "price":
        return (
          <div className="flex flex-col gap-1">
            <p>
              {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
              <span className="font-bold pl-2 text-xs">{reservation.price_hour? formatCurrency(reservation.price_hour) : ""}</span>
            </p>
            <p className="whitespace-nowrap">
              {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
              <span className="font-bold pl-2 text-xs">{reservation.price_midday? formatCurrency(reservation.price_midday) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
              <span className="font-bold pl-2 text-xs">{reservation.price_day? formatCurrency(reservation.price_day) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
              <span className="font-bold pl-2 text-xs">{reservation.price_week? formatCurrency(reservation.price_week) : ""}</span>
            </p>
            <p>
              {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
              <span className="font-bold pl-2 text-xs">{reservation.price_month? formatCurrency(reservation.price_month) : ""}</span>
            </p>
          </div>
        );
      case "agency":
        return (
          <Link href={`/${locale}/admin/agencies/${reservation.agency_id}`}>
            {capitalize(reservation.agency)}
          </Link>
        );
      case "created_at":
        return (
          <p className="whitespace-nowrap">{formatDateTime(reservation.created_at, locale)}</p>
        );
      case "created_by":
        return (
          <div>
          { reservation.created_by ? (
            <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`}>
              {
                reservation.parent_lastname && reservation.parent_firstname ? 
                getUsername(reservation.parent_lastname, reservation.parent_firstname): ""
              }
            </Link>
          ): null}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
      <div className="rounded-sm border border-divider px-5 pb-2.5 mb-4 pt-6 bg-content2 shadow-defaultt sm:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between gap-3 items-end">
              <Input
                isClearable
                classNames={{
                  base: "w-full sm:max-w-[50%] z-1",
                  inputWrapper: "border-1",
                }}
                placeholder={t_table("search_placeholder")}
                size="sm"
                startContent={<SearchIcon fill="currentColor" size={18} />}
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="flex z-1">
                    <Button
                      endContent={<ChevronDownIcon fill="currentColor" size={10} />}
                      size="sm"
                      variant="flat"
                      className="bg-foreground text-background"
                    >
                      {t_table("colunms")}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid}>
                        {capitalize(locale === "en" ? column.name_en: column.name_fr)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">{`${t_table("total")}`} {reservations.length}</span>
              <label className="flex items-center text-default-400 text-small">
                {t_table("row_per_page")}
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                  defaultValue={15}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }, [
    filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, reservations.length, hasSearchFilter, ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center z-1">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-primary text-background",
          }}
          color="primary"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} ${t_table("of")} ${items.length} ${t_table("selected")}`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["!w-[calc(100vw_-_32px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]", "!rounded-none","relative",
        "overflow-hidden", "over-x", "over-y", "!bg-transparent",
        "!shadow-none", "!border-none", "!py-0", "!px-0", "!m-0"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );
  return (
    <>
      <Table
        isCompact
        aria-label="bb-reservation table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={classNames}
        selectedKeys={selectedKeys}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {locale === "en" ? column.name_en: column.name_fr}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={t_table("noItems")} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

