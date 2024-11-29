"use client"

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, ChipProps, User} from "@nextui-org/react";
import { useLocale } from 'next-intl';
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

const statusColorMap: Record<string, ChipProps["color"]>  = {
  active: "success",
  suspended: "danger",
};


export default function UserTable({ columns, users }: { columns: any[], users: any[] }) {
  type User = typeof users[0];
  const locale = useLocale();
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "lastname":
        return (
          <Link href={`/${locale}/admin/staff/${user.id}`}>
            <User
              avatarProps={
                {radius: "full", size: "sm", src: user.image? getImageUrl(user.image) : "" }
              }
              classNames={{
                name: "font-semibold",
              }}
              description={user.firstname}
              name={cellValue}
            />
          </Link>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["!w-[calc(100vw_-_32px)] sm:!w-[calc(100vw_-_3rem)] lg:!w-[calc(100vw_-_19.75rem)]",
        "!rounded-none","relative",, "!bg-transparent",
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
  <Table
    isCompact
    aria-label="bb-reservation table"
    classNames={classNames}
    topContent={
      <div className="w-full flex justify-end">
        <span className="text-default-400 text-small font-semibold bg-content2 px-4 py-1">Total: {users.length}</span>
      </div>
    }
  >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {locale === "en" ? column.name_en: column.name_fr}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(user) => (
          <TableRow key={user.id}>
            {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}