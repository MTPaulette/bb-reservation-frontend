"use client"

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CameraIcon } from "@/components/Icons";
import { getAgencyById } from '@/lib/action/agencies';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, getUsername } from "@/lib/utils";
import CardDataStats from "@/components/admin/CardDataStats";

import { CharetIcon, EyeIcon, PeopleIcon, ShoppingBagIcon } from "@/components/Icons";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditStaff from "@/components/admin/FormElements/Staff/Edit";
import DeleteStaff from "@/components/admin/FormElements/Staff/Delete";
import SuspendStaff from '@/components/admin/FormElements/Staff/Suspend';
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";

export default function ViewStaff({id}: {id: string}) {
  const { data: session } = useSession();
  const authUserId = session?.user.id;
  const [user, setUser] = useState([]);
  const [agency, setAgency] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = React.useState<boolean>(false);
  const [showSuspendModal, setShowSuspendModal] = React.useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const t = useTranslations("Profile");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");

  useEffect(() => {
    setError("");
    getAgencyById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setAgency(response);
          setLoading(false);
        }else {
          const status = res.status;
          switch (status) {
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


  if (!user) {
    notFound();
  }

  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
    </div>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default">
      {JSON.stringify(agency)}
      {agency.name}
    </div>
    )}
    </>
  )
}
