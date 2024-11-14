"use client";

import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/admin/Breadcrumb";
import { getAllPermissions, getRoleById } from '@/lib/action/roles';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import Title from '@/components/Title';
import { Checkbox } from '@nextui-org/react';
import { CommonSkeleton } from '@/components/Skeletons';
/*
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description:
    "See more about user",
};
*/

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  let perms = [];

  useEffect(() => {
    getRoleById(Number(id))
      .then(response => {
        setRole(response[0]);
        response[0].permissions.forEach(permission => {
          perms.push(permission.id);
        });

        console.log(perms);
        setSelectedPermissions(perms);
        perms = [];
        //console.log(role.permissions);
      })
      .catch(error => {
        console.error(error);
      });
    
    getAllPermissions()
    .then(response => {
      setPermissions(response);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
    });

  }, []);
  /*
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]); 
  <Form invoice={invoice} customers={customers} />  */

  if (!role) {
    notFound();
  }
 

  const handleCheckboxChange = (e) => {
    const permissionId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedPermissions((prevPermissions) => [...prevPermissions, permissionId]);
    } else {
      setSelectedPermissions((prevPermissions) =>
        prevPermissions.filter((permission) => permission !== permissionId)
      );
    }
  };
  type PermissionType = typeof permissions[0];

  return (
    <>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div>
      <Breadcrumb pageName="role" />
      <div>
        <Title className="text-xl font-medium my-4">Permissions {`Role ${role.name? role.name: ''}`} </Title>
        <div className="bg-green-100 my-4">
          {JSON.stringify(selectedPermissions)}
        </div>
        <div className="bg-yellow-100 my-4">
          {JSON.stringify(role.permissions)}
        </div>
        {permissions.map((permission: PermissionType) => (
          <div key={permission.id} className="flex gap-4 p-1">
            <input
              type="checkbox"
              value={permission.id}
              onChange={handleCheckboxChange}
            />
            {/* <Checkbox /> */}
            <p className="font-light text-sm text-foreground">
              {permission.id}.
              <span className="font-medium text-sm mx-4">
                {permission.name}
              </span>
              <span>
                {locale === "en" ? permission.description_en: permission.description_fr}
              </span>
            </p>
          </div>
        ))}
        <div>
        <h2>Permissions sélectionnées</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {selectedPermissions.map((permissionId) => (
              <tr key={permissionId}>
                <td>{permissionId}</td>
                <td>
                  {permissions.find((permission) => (permission.id) === permissionId).description_en}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
      )}
    </>
  );
}
