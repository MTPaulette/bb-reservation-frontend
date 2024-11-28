"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor, Chip, ChipProps
} from "@nextui-org/react";

import { PlusIcon, SearchIcon, ChevronDownIcon, VerticalDotsIcon } from "@/components/Icons";
import { CouponType } from "@/lib/definitions";
import { capitalize, formatCurrency, getUsername } from "@/lib/utils";
import { columnsCoupon as columns, statusCoupon as statusOptions } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";

import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { CommonSkeleton } from '@/components/Skeletons';
import NewCoupon from "../FormElements/Coupon/New";
import EditCoupon from "../FormElements/Coupon/Edit";
import DeleteCoupon from "../FormElements/Coupon/Delete";
import { getCoupons } from '@/lib/action/coupons';
import { signOut } from 'next-auth/react';


const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  expired: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["name", "total_usage", "value", "status", "expired_on", "created_by", "actions"];

export default function CouponsTable() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");

  useEffect(() => {
    setError("");
    getCoupons()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setCoupons(await res.json());
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

  type Coupon = typeof coupons[0];

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

  const pages = Math.ceil(coupons.length / rowsPerPage);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [selectedCoupon, setSelectedCoupon] = React.useState<CouponType>();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCoupons = [...coupons];

    if (hasSearchFilter) {
      filteredCoupons = filteredCoupons.filter((coupon) =>
        coupon.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredCoupons = filteredCoupons.filter((coupon) =>
        Array.from(statusFilter).includes(coupon.status),
      );
    }

    return filteredCoupons;
  }, [coupons, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Coupon, b: Coupon) => {
      const first = a[sortDescriptor.column as keyof Coupon] as number;
      const second = b[sortDescriptor.column as keyof Coupon] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((coupon: Coupon, columnKey: React.Key) => {
    const cellValue = coupon[columnKey as keyof Coupon];

    switch (columnKey) {
      case "code":
        return (
          <p className="font-semibold"></p>
        );
      case "name":
        return (
          <div className="min-w-[80px]">
            <Link
              href={`/${locale}/admin/coupons/${coupon.id}`}
              className="font-semibold whitespace-nowrap"
            >{coupon.name? capitalize(coupon.name): ''}  |  {coupon.code? coupon.code: ''}</Link>
            <p className="font-light text-small text-foreground/70">
              {capitalize(locale === "en" ? coupon.note_en: coupon.note_fr)}
            </p>
          </div>
        );
      case "value":
        return (
          <div>
            <p className="font-semibold">{coupon.percent? coupon.percent+' %': ''}</p>
            <p className="font-semibold">{coupon.amount? formatCurrency(coupon.amount): ''}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[coupon.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "created_by":
        return (
          <div>
          { coupon.created_by ? (
            <Link href={`/${locale}/admin/staff/${coupon.created_by.id}`}>
              {getUsername(coupon.created_by.lastname, coupon.created_by.firstname)}
            </Link>
          ): null}
          </div>
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
                  <Link href={`/${locale}/admin/coupons/${coupon.id}`}>
                    {t_table("view")}
                  </Link>
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setShowEditModal(true);
                  }}
                >{t_table("edit")}</DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    setSelectedCoupon(coupon);
                    setShowDeleteModal(true);
                  }}
                >{t_table("delete")}</DropdownItem>
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
              <span className="text-default-400 text-small">{`${t_table("total")}`} {coupons.length}</span>
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
    filterValue,statusFilter, visibleColumns, onSearchChange, onRowsPerPageChange, coupons.length, hasSearchFilter, ]);

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

      <Modal
        open={showNewModal} close={() => setShowNewModal(false)}
        title={t_table("newCoupon")}
      >
        <NewCoupon />
      </Modal>

      <Modal
        open={showEditModal} close={() => setShowEditModal(false)}
        title={`${t_table("editCoupon")} "${selectedCoupon? selectedCoupon.name: ''}"`}
      >
        <EditCoupon id={selectedCoupon?.id} />
      </Modal>
      
      <Modal
        open={showDeleteModal} close={() => setShowDeleteModal(false)}
        title={`${t_table("deleteCoupon")} "${selectedCoupon? selectedCoupon.name: ''}"`}
      >
        <DeleteCoupon id={selectedCoupon?.id} />
      </Modal>
      </div>
      )}
    </>
  );
}

