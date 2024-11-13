"use client";

import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { columnsRole as columns } from "@/lib/data";
import { PencilSquareIcon } from "@/components/Icons";
import { getRoles } from '@/lib/action/roles';
import { CommonSkeleton } from '@/components/Skeletons';
import { useLocale } from 'next-intl';
import Link from 'next/link';


export default function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    getRoles()
      .then(response => {
        setRoles(response);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  type Role = typeof roles[0];

  const renderCell = React.useCallback((role: Role, columnKey: React.Key) => {
    const cellValue = role[columnKey as keyof Role];

    switch (columnKey) {
      case "role":
        return (
          <div className="flex gap-2">
            {/* <p className="text-bold text-sm capitalize">{cellValue}</p> */}
            <p className="text-bold text-sm capitalize">{role.name}</p>
            <Tooltip content="Edit role">
              <Link className="cursor-pointer" href={`/${locale}/admin/roles/${role.id}`}>
                <PencilSquareIcon fill="currentColor" size={14} />
              </Link>
            </Tooltip>
          </div>
        );
      case "permissions":
        return (
          <div>
            {role.permissions.map((permission) => (
              <p key={permission.id} className="font-light text-sm text-foreground">
                {permission.id}.
                <span className="font-medium text-sm mx-4">
                  {permission.name}
                </span>
                <span>
                  {locale === "en" ? permission.description_en: permission.description_fr}
                </span>
              </p>
            ))}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      table: ["rounded-sm border border-divider bg-background px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1"], //lg:h-[calc(100vh_-_5.625rem)]
      // table: ["bg-green-300"],
      th: ["bg-transparent", "text-foreground", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "bg-transparent", "text-foreground", "border-b", "border-divider"
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
        isStriped
        removeWrapper
        aria-label="roles table"
        classNames={classNames}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {locale === "en" ? column.name_en: column.name_fr}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={roles}>
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
  );
}

