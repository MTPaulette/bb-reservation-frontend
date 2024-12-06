"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Chip, Pagination, Selection, ChipProps, SortDescriptor
} from "@nextui-org/react";

import { PlusIcon, SearchIcon, ChevronDownIcon, VerticalDotsIcon } from "@/components/Icons";
import { ReservationType } from "@/lib/definitions";
import { capitalize, formatCurrency, formatDateTime, getUsername } from "@/lib/utils";
import { columnsReservation as columns, statusReservation as statusOptions } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";

import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { CommonSkeleton } from '@/components/Skeletons';
import NewReservation from "../FormElements/Reservation/New";
import EditReservation from "../FormElements/Reservation/Edit";
import CancelReservation from '../FormElements/Reservation/Cancel';
import { getReservations } from '@/lib/action/reservations';
import { signOut } from 'next-auth/react';


const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};
const INITIAL_VISIBLE_COLUMNS = ["ressource", "client", "date", "initial_amount", "amount_due", "state", "agency", "created_by", "actions"];

export default function ReservationsTable() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");

  useEffect(() => {
    setError("");
    getReservations()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setReservations(await res.json());
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

  type Reservation = typeof reservations[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "created_at",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(reservations.length / rowsPerPage);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showCancelModal, setShowCancelModal] = React.useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] = React.useState<ReservationType>();

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
        reservation.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredReservations = filteredReservations.filter((reservation) =>
        Array.from(statusFilter).includes(reservation.status),
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
          <Link href={`/${locale}/admin/agencies/${reservation.ressource.agency.id}`}>
            {capitalize(reservation.ressource.agency.name)}
          </Link>
        );
      case "date":
        return (
          <div className="text-sm whitespace-nowrap">
            {/* <p className="font-semibold text-sm">{`${t_table("from")}: ${formatDateTime(reservation.start_date, locale)} - ${t_table("to")}: ${formatDateTime(reservation.end_date, locale)}`}</p> */}
            <p className="font-semibold text-sm">{`${formatDateTime(reservation.start_date, locale)} - ${formatDateTime(reservation.end_date, locale)}`}</p>
            {/* <p className="font-semibold text-sm">{`(${reservation.start_date} - ${reservation.end_date})`}</p> */}
            <p className="dark:text-foreground/60">{`(${reservation.start_time} - ${reservation.end_time})`}</p>
          </div>
        );
      case "initial_amount":
        return (
          <p className="text-sm font-semibold dark:font-normal dark:text-foreground/60">
            {reservation.initial_amount? formatCurrency(reservation.initial_amount): ''}
          </p>
        );
      case "amount_due":
        return (
            <p className={`${reservation.amount_due > 0 ? "text-sm font-semibold dark:font-medium text-danger": "text-sm font-semibold dark:font-normal"}`}>
              {reservation.amount_due > 0 ? formatCurrency(reservation.amount_due): "0"}
            </p>
        );
      case "state":
        return (
          <Chip
            className="capitalize border-none gap-1"
            color={
              reservation.state == "partially paid" ? statusColorMap["partially_paid"] : 
              reservation.state == "totally paid" ? statusColorMap["totally_paid"] : 
              statusColorMap[reservation.state]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "coupon":
        return (
          <>
          {reservation.coupon_id ? (
            <Link
              href={`/${locale}/admin/coupons/${reservation.coupon_id}`}
              className="text-sm text-foreground/60"
            >
              {reservation.coupon.name? 
                capitalize(reservation.coupon.name): ''} <br />
                {reservation.coupon.code? reservation.coupon.code: ''}
            {/* <p className="font-light text-small text-foreground/70">
              {capitalize(locale === "en" ? coupon.note_en: coupon.note_fr)}
            </p> */}
            </Link>
          )
          : null}
          </>
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
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon fill="none" size={24} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Link href={`/${locale}/admin/reservations/${reservation.id}`}>
                    {t_table("view")}
                  </Link>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setShowEditModal(true);
                  }}
                >{t_table("edit")}</DropdownItem>
                <DropdownItem
                  color="warning"
                  onClick={() => {
                    setSelectedReservation(reservation);
                    setShowCancelModal(true);
                  }}
                >{reservation.state != 'cancelled'? t_table("cancel"): t_table("undo_cancellation")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
      <div className="block md:hidden mb-4 max-w-screen">
        <Alert color="warning" message={t_alert("mobileDisplayWarning")} />
      </div>
      <div className="rounded-sm border border-divider px-5 pb-2.5 mb-4 pt-6 sm:px-7.5 xl:pb-2 bg-background shadow-default">
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
                <Button
                  // className="bg-foregroundd text-backgroundd"
                  endContent={<PlusIcon fill="currentColor" size={14} />}
                  size="sm" variant="solid" color="primary"
                  onClick={() => setShowNewModal(true)}
                >
                  {t_table("new")}
                </Button>
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
      wrapper: ["!w-[calc(100vw_-_32px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]", "!rounded-none","relative",

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
      {loading ? (
        <CommonSkeleton />
      ) : (
      <div>
      <Table
        isCompact
        aria-label="bb-reservation table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
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

      <Modal
        open={showNewModal} close={() => setShowNewModal(false)}
        title={t_table("newReservation")}
      >
        <NewReservation />
      </Modal>

      <Modal
        open={showEditModal} close={() => setShowEditModal(false)}
        title={`${t_table("editReservation")} "${selectedReservation? selectedReservation.ressource.space.name: ''}"`}
      >
        <EditReservation reservation={selectedReservation} />
      </Modal>
    
      <Modal
        open={showCancelModal} close={() => setShowCancelModal(false)}
        title={`${t_table("cancelReservation")} "${selectedReservation? selectedReservation.ressource.space.name: ''}"`}
      >
        <CancelReservation id={selectedReservation?.id} state={selectedReservation?.state} />
      </Modal>
      </div>
      )}
    </>
  );
}

