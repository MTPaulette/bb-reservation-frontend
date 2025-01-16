"use client";

import React, { useState, useEffect } from 'react';
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Button, DropdownTrigger, Dropdown, DropdownMenu,
  DropdownItem, Pagination, Selection, SortDescriptor
} from "@nextui-org/react";

import { PlusIcon, SearchIcon, ChevronDownIcon, VerticalDotsIcon } from "@/components/Icons";
import { CharacteristicType } from "@/lib/definitions";
import { capitalize } from "@/lib/utils";
import { columnsCharacteristic as columns } from "@/lib/data";
import { useLocale, useTranslations } from 'next-intl';

import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { CommonSkeleton } from '@/components/Skeletons';
import EditCharacteristic from "../FormElements/Characteristic/Edit";
import DeleteCharacteristic from "../FormElements/Characteristic/Delete";
import { getCharacteristics } from '@/lib/action/admin/characteristics';
import { signOut, useSession } from 'next-auth/react';
import NewCharacteristic from '../FormElements/Characteristic/New';
import { redirect } from 'next/navigation';

const INITIAL_VISIBLE_COLUMNS = ["characteristic", "actions"];

export default function CharacteristicsTable() {
  const [characteristics, setCharacteristics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_spaces", "create_space", "edit_space"];
  
  const characteristic_permissions: string[] = ["manage_spaces", "create_space", "edit_space"];

  useEffect(() => {
    setError("");
    getCharacteristics()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setCharacteristics(await res.json());
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
  }, []);

  type Characteristic = typeof characteristics[0];

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "characteristic",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(characteristics.length / rowsPerPage);
  const [showNewModal, setShowNewModal] = React.useState<boolean>(false);
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [selectedCharacteristic, setSelectedCharacteristic] = React.useState<CharacteristicType>();

  // const changeSelectedCharacteristic

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCharacteristics = [...characteristics];

    if (hasSearchFilter) {
      filteredCharacteristics = filteredCharacteristics.filter((characteristic) => 
        locale === "en" ? characteristic.name_en.toLowerCase().includes(filterValue.toLowerCase()) :
      characteristic.name_fr.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredCharacteristics;
  }, [characteristics, filterValue]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Characteristic, b: Characteristic) => {
      const first = a[sortDescriptor.column as keyof Characteristic] as number;
      const second = b[sortDescriptor.column as keyof Characteristic] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((characteristic: Characteristic, columnKey: React.Key) => {
    const cellValue = characteristic[columnKey as keyof Characteristic];

    switch (columnKey) {
      case "characteristic":
        return (
          <p className="font-semibold">
            {capitalize(locale === "en" ? characteristic.name_en || characteristic.name_fr : characteristic.name_fr)}
          </p>
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
              <>
              {!permissions ? null : (
              <DropdownMenu>
                <DropdownItem
                  className={
                    characteristic_permissions.some(permission =>
                    permissions.includes(permission)) ? "block" : "hidden"
                  }
                  onClick={() => {
                    setSelectedCharacteristic(characteristic);
                    setShowEditModal(true);
                  }}
                >{t_table("edit")}</DropdownItem>
                <DropdownItem
                  className={
                    characteristic_permissions.some(permission =>
                    permissions.includes(permission)) ? "block" : "hidden"
                  }
                  color="danger"
                  onClick={() => {
                    setSelectedCharacteristic(characteristic);
                    setShowDeleteModal(true);
                  }}
                >{t_table("delete")}</DropdownItem>
              </DropdownMenu>
              )}
              </>
            </Dropdown>
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
                  {characteristic_permissions.some(permission =>
                  permissions.includes(permission)) && (
                    <Button
                      endContent={<PlusIcon fill="currentColor" size={14} />}
                      size="sm" variant="solid" color="primary"
                      onClick={() => setShowNewModal(true)}
                    >
                      {t_table("new")}
                    </Button>
                  )}
                </>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">{`${t_table("total")}`} {characteristics.length}</span>
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
    filterValue, visibleColumns, onSearchChange, onRowsPerPageChange, characteristics.length, hasSearchFilter, permissions]);

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
        title={t_table("newCharacteristic")}
      >
        <NewCharacteristic />
      </Modal>

      <Modal
        open={showEditModal} close={() => setShowEditModal(false)}
        title={`${t_table("editCharacteristic")} "${selectedCharacteristic? selectedCharacteristic.name_fr: ''}"`}
      >
        <EditCharacteristic characteristic={selectedCharacteristic} />
      </Modal>

      <Modal
        open={showDeleteModal} close={() => setShowDeleteModal(false)}
        title={`${t_table("deleteCharacteristic")} "${selectedCharacteristic? selectedCharacteristic.name_fr: ''}"`}
      >
        <DeleteCharacteristic id={selectedCharacteristic?.id} />
      </Modal>
      </div>
      )}
    </>
    )}
    </>
  );
}
