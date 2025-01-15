"use client";

import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { columnsRole as columns } from "@/lib/data";
import { PencilSquareIcon } from "@/components/Icons";
import { getRoles } from '@/lib/action/admin/roles';
import { CommonSkeleton } from '@/components/Skeletons';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Alert from "@/components/Alert";


export default function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_permissions"];

  useEffect(() => {
    getRoles()
    .then(async (res) => {
      setLoading(false);
      if(res?.ok){
        setRoles(await res.json());
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
  
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : 
      <>
      {loading ? (
        <CommonSkeleton />
      ) : (
        <div>
        <Table 
          isCompact
          isStriped
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
      }
    </div>
    </>
    )}
    </>
  );
}
