"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor
} from "@nextui-org/react";

import { SearchIcon, ChevronDownIcon, TrashIcon } from "@/components/Icons";
import { capitalize, formatDateTime, getUsername } from "@/lib/utils";
import { columnsLog as columns } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { CommonSkeleton } from '@/components/Skeletons';
import ClearLog from "../formElements/log/Clear";
import { getLogs } from '@/lib/action/admin/logs';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const INITIAL_VISIBLE_COLUMNS = ["description", "agent", "author", "created_at"];

export default function LogsTable() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");

  const { data: session } = useSession();
  const permissions = session?.permissions;

  const custom_permissions = useMemo(() => {
    return {
      requiredPermissions: ["view_logactivity"],
      clear_log_permissions: ["delete_logactivity"]
    };
  }, []);

  useEffect(() => {
    setError("");
    getLogs()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setLogs(await res.json());
        }else {
          const status = res.status;
          switch(status) {
            case 401:
            setError(t_error("unauthenticated"));
            setTimeout(async () => {
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
            }, 500);
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
  }, [locale, t_error]);

  type Log = typeof logs[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "created_at",
    direction: "descending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(logs.length / rowsPerPage);
  const [showClearModal, setShowClearModal] = React.useState<boolean>(false);
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredLogs = [...logs];

    if (hasSearchFilter) {
      filteredLogs = filteredLogs.filter((log) =>
        log.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredLogs;
  }, [logs, hasSearchFilter, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Log, b: Log) => {
      const first = a[sortDescriptor.column as keyof Log] as number;
      const second = b[sortDescriptor.column as keyof Log] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((log: Log, columnKey: React.Key) => {
    const cellValue = log[columnKey as keyof Log];

    switch (columnKey) {
      case "description":
        return (
          <p className="font-medium text-foreground">
            {cellValue}
          </p>
        );
      case "author":
        return (
          <p className="font-medium text-small">{log.lastname && log.firstname? getUsername(log.lastname, log.firstname): ""}</p>
        );
      case "created_at":
        return (
          <p className="whitespace-nowrap">{formatDateTime(log.created_at, locale)}</p>
      );
      default:
        return cellValue;
    }
  }, [locale]);
  
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
                <>
                  {custom_permissions.clear_log_permissions.some(permission =>
                  permissions.includes(permission)) && (
                    <Button
                      endContent={<TrashIcon fill="currentColor" size={14} />}
                      size="sm" variant="solid" color="danger"
                      onClick={() => setShowClearModal(true)}
                    >
                      {t_table("clear_log")}
                    </Button>
                  )}
                </>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">{`${t_table("total")}`} {logs.length}</span>
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
  }, [permissions, t_alert, t_table, filterValue, onSearchChange, visibleColumns, custom_permissions.clear_log_permissions, logs.length, onRowsPerPageChange, locale]);

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
    {!permissions ? (
      <CommonSkeleton />
    ) : (
    <>
      {custom_permissions.requiredPermissions.every(permission =>
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
        open={showClearModal} close={() => setShowClearModal(false)}
        title={`${t_table("clear_log")}`}
      >
        <ClearLog />
      </Modal>
      </div>
      )}
    </>
    )}
    </>
  );
}

