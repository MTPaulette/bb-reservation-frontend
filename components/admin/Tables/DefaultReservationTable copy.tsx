"use client";

import React from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor,
  ChipProps,
  Chip
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon, EyeIcon } from "@/components/Icons";
import { capitalize, getUsername, formatCurrency, formatDateTime } from "@/lib/utils";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["id", "ressource", "client", "date", "amount", "agency", "actions"];

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
        reservation.ressource.space.name.toLowerCase().includes(filterValue.toLowerCase()),
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
      case "ressource":
        return (
          <Link href={`/${locale}/admin/ressources/${reservation.ressource.id}`}>
            {capitalize(reservation.ressource.space.name)}
          </Link>
        );
      case "client":
        return (
          <Link href={`/${locale}/admin/clients/${reservation.client.id}`}>
            {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
          </Link>
        );
      case "agency":
        return (
          <div>
            {capitalize(reservation.ressource.agency.name)}
            <p className="text-xs truncate">
              {t_table("by")}:
              <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`} className="ml-1">
                {reservation.created_by.firstname && reservation.created_by.lastname ?
                  getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
              </Link>
            </p>
          </div>
          // <Link href={`/${locale}/admin/agencies/${reservation.ressource.agency.id}`}>
          //   {capitalize(reservation.ressource.agency.name)}
          // </Link>
        );
      case "date":
        return (
          <div className="text-sm whitespace-nowrap">
            {/* <p className="font-semibold text-sm">{`${t_table("from")}: ${formatDateTime(reservation.start_date, locale)} - ${t_table("to")}: ${formatDateTime(reservation.end_date, locale)}`}</p> */}
            <p className="font-semibold text-sm">{`${reservation.start_date} - ${reservation.end_date}`}</p>
            <p className="dark:text-foreground/60">{`(${reservation.start_hour} - ${reservation.end_hour})`}</p>
          </div>
        );
      case "state":
        return (
          <Chip
            className="capitalize border-none gap-1"
            color={
              reservation.state == "partially paid" ? statusColorMap["partially_paid"] : 
              reservation.state == "totally paid" ? statusColorMap["totally_paid"] : 
              statusColorMap[reservation.state]
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "created_at":
        return (
          <p className="whitespace-nowrap">{formatDateTime(reservation.created_at, locale)}</p>
        );
      case "created_by":
        return (
          <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`} className="font-medium">
            {reservation.created_by.firstname && reservation.created_by.lastname? getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
          </Link>
        );
      case "created_by":
        return (
          <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`} className="font-medium">
            {reservation.created_by.firstname && reservation.created_by.lastname? getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
          </Link>
        );
      case "amount":
        return (
          <div>
            <p className="dark:text-foreground/60">
              {reservation.initial_amount? formatCurrency(reservation.initial_amount): ''}
            </p>
            <div>
              <span className="mr-1.5 text-xs">
                {t_table("left")}:
              </span>
              <span className={`${reservation.amount_due > 0 ? "font-medium text-danger": "font-semibold dark:font-normal"}`}>
                {reservation.amount_due > 0 ? formatCurrency(reservation.amount_due): "0"}
              </span>
            </div>
          </div>
        );
      case "actions":
        return (
          <Link href={`/${locale}/admin/reservations/${reservation.id}`}>
            <Button isIconOnly radius="full" size="sm" variant="light">
              <EyeIcon fill="currentColor" size={16} />
            </Button>
          </Link>
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
      wrapper: ["!w-[calc(100vw_-_180px)]", "!rounded-none","relative",
        "overflow-hiddenn", "!over-x", "!over-y", "!bg-transparent",
        "!shadow-none", "!border-none", "!py-0", "!px-0", "!m-0",
        "h-full"
      ],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider",],
      td: [
        "data-[hover=true]:bg-content2",
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

