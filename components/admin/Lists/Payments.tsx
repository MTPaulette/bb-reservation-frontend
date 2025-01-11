"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor, Chip, ChipProps
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon } from "@/components/Icons";
import { capitalize, formatCurrency, formatDateTime, getUsername } from "@/lib/utils";
import { columnsPayment as columns, statusCoupon as statusOptions } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";

import Alert from "@/components/Alert";
import { CommonSkeleton } from '@/components/Skeletons';
import { getPayments } from '@/lib/action/admin/payments';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  expired: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["reservation_id", "amount", "payment_method", "transaction_id", "bill_number", "processed_by", "created_at"];

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");
  
  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_payments", "show_all_payment"];

  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];
  const view_reservation_permissions: string[] = ["manage_reservations", "view_reservation", "view_reservation_of_agency"];


  useEffect(() => {
    setError("");
    getPayments()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setPayments(await res.json());
        }else {
          const status = res.status;
          switch(status) {
            case 401:
              setError(t_error("unauthenticated"));
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
              break;
            case 403:
              setError(t_error("acces_denied"));
              break;
            case 404:
              setError(t_error("server_not_found"));
              break;
            case 500:
              setError(t_error("something_wrong"));
              break;
            default:
              break;
          }
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);

  type Payment = typeof payments[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(payments.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPayments = [...payments];

    if (hasSearchFilter) {
      filteredPayments = filteredPayments.filter((payment) =>
        payment.payment_method.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredPayments = filteredPayments.filter((payment) =>
        Array.from(statusFilter).includes(payment.payment_status),
      );
    }

    return filteredPayments;
  }, [payments, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Payment, b: Payment) => {
      const first = a[sortDescriptor.column as keyof Payment] as number;
      const second = b[sortDescriptor.column as keyof Payment] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((payment: Payment, columnKey: React.Key) => {
    const cellValue = payment[columnKey as keyof Payment];

    switch (columnKey) {
      case "reservation_id":
        return (
          <>
          {!permissions ? null : (
            <>
            {view_reservation_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/reservations/${payment.reservation_id}`}>
                {payment.reservation_id}
              </Link>
            ): (
              <span>
                {payment.reservation_id}
              </span>
            )}
            </>
          )}
          </>
        );
      case "amount":
        return (
          <p className="text-sm font-semibold dark:font-normal dark:text-foreground/60">
            {payment.amount? formatCurrency(payment.amount): ''}
          </p>
        );
      case "payment_method":
        return (
          <span className="whitespace-nowrap">{payment.payment_method}</span>
        );
      case "processed_by":
        return (
          <>
          {!permissions ? null : (
            <>
            {view_staff_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/staff/${payment.processed_by.id}`}>
                {payment.processed_by.lastname && payment.processed_by.firstname? getUsername(payment.processed_by.lastname, payment.processed_by.firstname): ""}
              </Link>
            ): (
              <span>
                {payment.processed_by.lastname && payment.processed_by.firstname? getUsername(payment.processed_by.lastname, payment.processed_by.firstname): ""}
              </span>
            )}
            </>
          )}
          </>
        );
      case "created_at":
        return (
          <p className="whitespace-nowrap">{formatDateTime(payment.created_at, locale)}</p>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[payment.payment_status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
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
      <>
      {!permissions ? (
        <CommonSkeleton />
      ) : (
      <>
      <div className="block md:hidden mb-4 max-w-screen">
        <Alert color="warning" message={t_alert("mobileDisplayWarning")} />
      </div>
      <div className="rounded-sm border border-divider px-5 pb-2.5 mb-4 pt-6 bg-background shadow-default sm:px-7.5 xl:pb-2">
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
                {/* <Dropdown>
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
                </Dropdown> */}
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
              <span className="text-default-400 text-small">{`${t_table("total")}`} {payments.length}</span>
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
      )}
      </>
    );
  }, [
    filterValue,statusFilter, visibleColumns, onSearchChange, onRowsPerPageChange, payments.length, hasSearchFilter, permissions]);

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
      wrapper: ["!w-[calc(100vw_-_30px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]", "!rounded-none","relative",
        "overflow-hidden", "over-x", "over-y", "!bg-transparent",
        "!shadow-none", "!border-none", "!p-0", "!m-0"],
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
    {!permissions ? (
      <CommonSkeleton />
    ) : (
    <>
      {requiredPermissions.every(permission =>
        !permissions.includes(permission)) && (
          redirect(`/${locale}/admin/forbidden`)
      )}

      {loading ? (
        <CommonSkeleton />
      ) : (
      <div>
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
        <TableBody emptyContent={error? <Alert color="danger" message={error} />: t_table("noItems")} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
      )}
    </>
    )}
    </>
  );
}
