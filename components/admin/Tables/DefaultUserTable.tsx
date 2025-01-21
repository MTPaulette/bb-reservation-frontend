"use client";

import React, { useMemo } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Chip, User, Pagination, Selection, ChipProps, SortDescriptor,
  Tooltip
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon, EyeIcon } from "@/components/Icons";
import { capitalize, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";
import { statusUser as statusOptions } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';
import Link from "next/link";
import { useSession } from 'next-auth/react';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  suspended: "danger"
};

const INITIAL_VISIBLE_COLUMNS = ["lastname", "email", "phonenumber", "status", "created_at", "actions"];

export default function DefaultUserTable({ columns, users }: { columns: unknown[], users: unknown[] }) {
  const locale = useLocale();
  const t_table = useTranslations("Table");
  type User = typeof users[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "lastname",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const custom_permissions = useMemo(() => {
    return {
      view_client_permissions: ["view_client"],
      view_staff_permissions: ["view_admin", "view_admin_of_agency", "view_superadmin"],
      view_agency_permissions: ["manage_agency", "manage_all_agencies"],
    };
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [columns, visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.lastname.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, statusFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "lastname":
        return (
          <User
            avatarProps={
              {className:"flex-shrink-0", radius: "full", size: "sm", src: user.image? getImageUrl(user.image) : "" }
            }
            classNames={{
              name: "font-semibold",
            }}
            description={user.firstname}
            name={cellValue}
          />
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "agency":
        return (
          <>
          {!permissions || !user.work_at ? null : (
            <>
            {custom_permissions.view_agency_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/agencies/${user.work_at}`} className="font-medium">
                {capitalize(user.agency)}
              </Link>
            ): (
              <span>
                {capitalize(user.agency)}
              </span>
            )}
            </>
          )}
          </>
        );
      case "created_at":
        return (
          <p className="whitespace-nowrap">{formatDateTime(user.created_at, locale)}</p>
        );
      case "created_by":
        return (
          <>
          {!permissions || !user.created_by ? null : (
            <>
            {custom_permissions.view_staff_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/staff/${user.created_by}`}>
                {
                  user.parent_lastname && user.parent_firstname ? 
                  getUsername(user.parent_lastname, user.parent_firstname): ""
                }
              </Link>
            ): (
              <span>
                {
                  user.parent_lastname && user.parent_firstname ? 
                  getUsername(user.parent_lastname, user.parent_firstname): ""
                }
              </span>
            )}
            </>
          )}
          </>
        );
      case "actions":
        return (
          <>
          {user.role == 'client' ? (
            <div
              className={
                custom_permissions.view_client_permissions.some(permission =>
                permissions.includes(permission)) ? "block" : "hidden"
              }
            >
              <Tooltip content={t_table("see_more")}>
                <Link href={`/${locale}/admin/clients/${user.id}`}>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <EyeIcon fill="currentColor" size={16} />
                  </Button>
                </Link>
              </Tooltip>
            </div>
          ) : null}

          {user.role != 'client' ? (
            <div
              className={
                custom_permissions.view_staff_permissions.some(permission =>
                permissions.includes(permission)) ? "block" : "hidden"
              }
            >
              <Tooltip content={t_table("see_more")}>
                <Link href={`/${locale}/admin/staff/${user.id}`}>
                  <Button isIconOnly radius="full" size="sm" variant="light">
                    <EyeIcon fill="currentColor" size={16} />
                  </Button>
                </Link>
              </Tooltip>
            </div>
          ) : null}
          </>
        );
      default:
        return cellValue;
    }
  }, [permissions, custom_permissions.view_agency_permissions, custom_permissions.view_staff_permissions, custom_permissions.view_client_permissions, locale, t_table]);
  

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
              <span className="text-default-400 text-small">{`${t_table("total")}`} {users.length}</span>
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
  }, [t_table, filterValue, onSearchChange, statusFilter, visibleColumns, columns, users.length, onRowsPerPageChange, locale]);

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
  }, [hasSearchFilter, page, pages, selectedKeys, t_table, items.length]);

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

