"use client";

import React, { useState, useEffect } from 'react';
import Breadcrumb from "@/components/admin/Breadcrumb";
import { getAllPermissions, getRoleById, updateRole } from '@/lib/action/admin/roles';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Title from '@/components/Title';
import { Button, Checkbox } from '@nextui-org/react';
import { CommonSkeleton } from '@/components/Skeletons';
import Alert from '@/components/Alert';
import { signOut, useSession } from 'next-auth/react';
import { RoleType, PermissionType } from '@/lib/definitions';

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");

  const [role, setRole] = useState<RoleType>();
  const locale = useLocale();
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [save, setSave] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { update } = useSession();
    const [notFoundStatus, setNotFoundStatus] = useState(false);

  let perms: number[]= [];
  useEffect(() => {
    getRoleById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setRole(response[0]);
          response[0].permissions.forEach((permission: { id: number; }) => {
            perms.push(permission.id);
          });
          setSelectedPermissions(perms);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          perms = [];
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
              setNotFoundStatus(true);
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

  // if (!role) {
  if (notFoundStatus) {
    notFound();
  }
 

  const handleCheckboxChange = (e: { target: { value: string; checked: boolean; }; }) => {
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
  
    const handleFormSubmit = async () => {
    setError("");
    setSuccess("");
    setSave(true);
    updateRole(selectedPermissions, Number(id))
    .then(async (res) => {
      setSave(false);
      if(res?.ok) {
        setSuccess(t("update_role_success_msg"));
        const response = await res.json();
        update({
          permissions: response.permissions
        })
        // setTimeout(() => {
        // // window.location.reload();
        // }, 1000);
      } else {
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
          case 404:
            setError(t_error("role_not_found"));
            break;
          case 422:
            const err = await res.json();
            setError(err.password? t_error("wrongPassword"): "")
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  }

  // type PermissionType = typeof permissions[0];

  return (
    <>
      <Breadcrumb pageName="role" />
      {loading ? (
        <CommonSkeleton />
      ) : (
      <div className="w-full">
        {error != "" ? (
          <Alert color="danger" message={error} />
        ) : null}
        {success != "" ? (
          <Alert color="success" message={success} />
        ) : null}
        <Title className="text-xl font-medium my-4">Permissions {`Role ${role && role.name? role.name: ''}`} </Title>
        {/* <form onSubmit={handleFormSubmit}> */}
          {permissions.map((permission: PermissionType) => (
            <div key={permission.id} className="flex gap-4 p-1">
              <Checkbox
                value={String(permission.id)}
                onChange={handleCheckboxChange}
                isSelected={selectedPermissions.includes(permission.id)}
                className="z-1"
              />
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
          <Button 
            // type="submit"
            color="primary"
            isLoading={save}
            size="md"
            className="mt-4"
            onClick={handleFormSubmit}
          >
            {t("save")}
          </Button>
        {/* </form> */}
      </div>
      )}
    </>
  );
}
