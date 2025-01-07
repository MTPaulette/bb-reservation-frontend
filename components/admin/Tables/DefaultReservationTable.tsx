"use client";

import React from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor,
  ChipProps,
  Chip,
  Tooltip
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon, EyeIcon } from "@/components/Icons";
import { capitalize, getUsername, formatCurrency, formatDateTime } from "@/lib/utils";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import { columnsTabsReservation as columns, statusReservation as statusOptions } from "@/lib/data";
import { useSession } from 'next-auth/react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["id", "ressource", "client", "date", "hour", "state", "actions"];

export default function DefaultReservationTable({ reservations }: { reservations: any[] }) {
  const locale = useLocale();
  const t_table = useTranslations("Table");
  type Reservation = typeof reservations[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "ressource",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(reservations.length / rowsPerPage);

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const view_ressource_permissions: string[] = ["manage_ressources", "view_ressource", "view_ressource_of_agency"];
  const view_reservation_permissions: string[] = ["manage_reservations", "view_reservation", "view_reservation_of_agency"];
  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];
  const view_client_permissions: string[] = ["view_client"];

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
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredReservations = filteredReservations.filter((reservation) =>
        Array.from(statusFilter).includes(reservation.state),
      );
    }

    return filteredReservations;
  }, [reservations, filterValue, statusFilter]);

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
          <>
          {!permissions ? null : (
            <>
            {view_ressource_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/ressources/${reservation.ressource.id}`}>
                {capitalize(reservation.ressource.space.name)}
              </Link>
            ): (
              <span>
                {capitalize(reservation.ressource.space.name)}
              </span>
            )}
            </>
          )}
          </>
        );
      case "client":
        return (
          <>
          {!permissions ? null : (
            <>
            {view_client_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/clients/${reservation.client.id}`}>
                {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
              </Link>
            ): (
              <span>
                {reservation.client.firstname && reservation.client.lastname? getUsername(reservation.client.lastname, reservation.client.firstname): ""}
              </span>
            )}
            </>
          )}
          </>
        );
      case "agency":
        return (
          <div className="text-foreground/60">
            {capitalize(reservation.ressource.agency.name)}
            <p className="text-xs truncate mt-1 text-foreground">
              <>
              {!permissions ? null : (
                <>
                {view_staff_permissions.some(permission =>
                permissions.includes(permission)) ? (
                  <>
                    {t_table("by")}:
                    <Link href={`/${locale}/admin/staff/${reservation.created_by.id}`} className="ml-1">
                      {reservation.created_by.firstname && reservation.created_by.lastname ?
                        getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
                    </Link>
                  </>
                ): (
                  <>
                    {t_table("by")}:
                    <span className="ml-1">
                      {reservation.created_by.firstname && reservation.created_by.lastname ?
                        getUsername(reservation.created_by.lastname, reservation.created_by.firstname): ""}
                    </span>
                  </>
                )}
                </>
              )}
              </>
            </p>
            <p className="text-xs truncate mt-1">
              {t_table("at")}: {formatDateTime(reservation.created_at, locale)}
            </p>
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
      case "date":
        return (
          <p className="text-sm whitespace-nowrap font-medium">
            {`${reservation.start_date} - ${reservation.end_date}`}
          </p>
        );
      case "hour":
        return (
          <p className="text-sm whitespace-nowrap dark:text-foreground/60">
            {`${reservation.start_hour} - ${reservation.end_hour}`}
          </p>
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
          <div
            className={
              view_reservation_permissions.some(permission =>
              permissions.includes(permission)) ? "block" : "hidden"
            }
          >
            <Tooltip content={t_table("see_more")}>
              <Link href={`/${locale}/admin/reservations/${reservation.id}`}>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <EyeIcon fill="currentColor" size={16} />
                </Button>
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [session, permissions]);
  

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
                aria-label="search"
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
                    >
                      {t_table("status")}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid}>
                        {capitalize(locale === "en" ? status.name_en: status.name_fr)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="flex z-1">
                    <Button
                      endContent={<ChevronDownIcon fill="currentColor" size={10} />}
                      size="sm"
                      variant="flat"
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
    );
  }, [
    filterValue, statusFilter, visibleColumns, onSearchChange, onRowsPerPageChange, reservations.length, hasSearchFilter, ]);

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
      wrapper: ["!w-[calc(100vw_-_32px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]",
        "!rounded-none","relative", "!shadow-none", "!border-none",
        "overflow-hidden", "over-x", "over-y", "!bg-transparent", "!pr-10"
      ],
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

  // wrapper: ["!w-[calc(100vw_-_32px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]", "!rounded-none","relative",
  //   "overflow-hidden", "over-x", "over-y", "!bg-transparentt !bg-red-900",
  //   "!shadow-none", "!border-none", "!py-0", "!px-0", "!m-0"],

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



