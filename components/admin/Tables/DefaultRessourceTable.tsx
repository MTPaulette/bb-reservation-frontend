"use client";

import React from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor,
  Tooltip
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon, EyeIcon } from "@/components/Icons";
import { capitalize, getUsername, formatCurrency, formatDateTime } from "@/lib/utils";
import { useLocale, useTranslations } from 'next-intl';
import { validitiesName as validities, columnsTabsRessource as columns } from "@/lib/data";
import Link from "next/link";
import { useSession } from 'next-auth/react';

const INITIAL_VISIBLE_COLUMNS = ["space", "price", "nb_place", "quantity", "created_at", "actions"];

export default function DefaultRessourceTable({ ressources }: { ressources: any[] }) {
  const locale = useLocale();
  const t_table = useTranslations("Table");
  type Ressource = typeof ressources[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "space",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(ressources.length / rowsPerPage);

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];
  const view_agency_permissions: string[] = ["manage_agency", "manage_all_agencies"];
  const view_ressource_permissions: string[] = ["manage_ressources", "view_ressource", "view_ressource_of_agency"];
  const view_space_permissions: string[] = ["manage_spaces", "view_space"];

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredRessources = [...ressources];

    if (hasSearchFilter) {
      filteredRessources = filteredRessources.filter((ressource) =>
        ressource.lastname.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredRessources;
  }, [ressources, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Ressource, b: Ressource) => {
      const first = a[sortDescriptor.column as keyof Ressource] as number;
      const second = b[sortDescriptor.column as keyof Ressource] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((ressource: Ressource, columnKey: React.Key) => {
    const cellValue = ressource[columnKey as keyof Ressource];

    switch (columnKey) {
      case "space":
        return (
          <>
          {!permissions ? null : (
            <>
            {view_space_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/spaces/${ressource.space_id}`} className="font-semibold">
                {capitalize(ressource.space)}
              </Link>
            ): (
              <span>
                {capitalize(ressource.space)}
              </span>
            )}
            </>
          )}
          </>
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
          <>
          {!permissions ? null : (
            <>
            {view_agency_permissions.some(permission =>
            permissions.includes(permission)) ? (
              <Link href={`/${locale}/admin/agencies/${ressource.agency_id}`}>
                {capitalize(ressource.agency)}
              </Link>
            ): (
              <span>
                {capitalize(ressource.agency)}
              </span>
            )}
            </>
          )}
          </>
        );
      case "created_at":
        return (
        <div>
          <p className="whitespace-nowrap">{formatDateTime(ressource.created_at, locale)}</p>
          <p className="text-xs truncate mt-1">
            <>
            {!permissions || !ressource.created_by  ? null : (
              <>
              {view_staff_permissions.some(permission =>
              permissions.includes(permission)) ? (
                <>
                  {t_table("by")}:
                  <Link href={`/${locale}/admin/staff/${ressource.created_by.id}`} className="ml-1">
                    {
                      ressource.parent_lastname && ressource.parent_firstname ? 
                      getUsername(ressource.parent_lastname, ressource.parent_firstname): ""
                    }
                  </Link>
                </>
              ): (
                <>
                  {t_table("by")}:
                  <span className="ml-1">
                    {
                      ressource.parent_lastname && ressource.parent_firstname ? 
                      getUsername(ressource.parent_lastname, ressource.parent_firstname): ""
                    }
                  </span>
                </>
              )}
              </>
            )}
            </>
          </p>
          </div>
        );
      case "actions":
        return (
          <div
            className={
              view_ressource_permissions.some(permission =>
              permissions.includes(permission)) ? "block" : "hidden"
            }
          >
            <Tooltip content={t_table("see_more")}>
              <Link href={`/${locale}/admin/ressources/${ressource.id}`}>
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
              <span className="text-default-400 text-small">{`${t_table("total")}`} {ressources.length}</span>
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
    filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, ressources.length, hasSearchFilter, ]);

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

