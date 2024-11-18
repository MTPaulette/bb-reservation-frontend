"use client"

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { CameraIcon } from "@/components/Icons";
import { getClientById } from '@/lib/action/clients';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, getUrl, getUsername } from "@/lib/utils";
import CardDataStats from "@/components/admin/CardDataStats";

import { CharetIcon, EyeIcon, PeopleIcon, ShoppingBagIcon } from "@/components/Icons";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditClient from "@/components/admin/FormElements/Client/Edit";
import DeleteClient from "@/components/admin/FormElements/Client/Delete";
import SuspendClient from '@/components/admin/FormElements/Client/Suspend';
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";

export default function ViewClient({id}: {id: string}) {
  const { data: session } = useSession();
  const authUserId = session?.user.id;
  const [user, setUser] = useState([]);
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
    getClientById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setUser(response);
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
      <div className="relative z-2 h-35 md:h-65">
        <Image
          priority
          src={"/images/cover/cover-01.png"}
          alt="profile cover"
          className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
          width={970}
          height={260}
          style={{
            width: "auto",
            height: "auto",
          }}
        />
        <div className={`${user.id == authUserId? 'absolute': 'hidden'} bottom-1 right-1 z-1 xsm:bottom-4 xsm:right-4`}>
          <label
            htmlFor="cover"
            className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
          >
            <input
              type="file"
              name="cover"
              id="cover"
              className="sr-only"
            />
            <span>
              <CameraIcon fill="white" size={14} />
            </span>
            <span>{t("edit")}</span>
          </label>
        </div>
      </div>
      <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className={`relative z-3 mx-auto flex justify-center items-center -mt-22 h-32 w-full max-w-30 sm:h-44 sm:max-w-44 sm:p-3 rounded-full p-1 backdrop-blur bg-opacity-40 dark:bg-opacity-70 ${user.status == 'active'? 'bg-success': 'bg-danger'}`}>
        {/* <div className="relative z-3 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3"> */}
          <div className="relative drop-shadow-2 h-30 w-30 sm:h-40 sm:w-40">
            <Image
              src={user.image? getUrl(user.image): "/images/brain-orange-400.png"}
              width={160}
              height={160}
              className="rounded-full h-full w-full"
              alt="profile"
            />

            <label
              htmlFor="profile"
              className={`${user.id == authUserId? 'absolute': 'hidden'} bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2`}
            >
              <CameraIcon fill="white" size={14} />
              <input
                type="file"
                name="profile"
                id="profile"
                className="sr-only"
              />
            </label>
          </div>
        </div>
        <div className="mt-4">
          
          <div className="relative flex justify-center items-center gap-1">
            <Title className="text-2xl font-semibold text-foreground">
              {getUsername(user.lastname, user.firstname)}
            </Title>
            <div className={`${user.id == authUserId? 'hidden': 'relative'}`}>
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light" className="z-2">
                    <VerticalDotsIcon fill="none" size={24} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  >{t_table("edit")}</DropdownItem>
                  <DropdownItem
                    color="warning"
                    onClick={() => {
                      setShowSuspendModal(true);
                    }}
                  >{user.status == 'active'? t_table("suspend"): t_table("cancel_suspend")}</DropdownItem>
                  <DropdownItem
                    color="danger"
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                  >{t_table("delete")}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <p className="font-medium capitalize"> {user.role} {user.agency? ' | '+ user.agency: ""}</p>
          <p className="mt-2 font-light"> {user.email} {user.phonenumber? ' | '+ user.phonenumber: ""}</p>
          <div className="mx-auto mb-5.5 mt-4.5 grid maxx-w-94 max-w-150 grid-cols-3 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2">
            <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
              <span className="font-semibold text-foreground">
                259
              </span>
              <span className="text-sm sm:whitespace-nowrap">{capitalize(t("reservations"))}</span>
            </div>
            <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
              <span className="font-semibold text-foreground">
                129K
              </span>
              <span className="text-sm sm:whitespace-nowrap">{capitalize(t("given_gift"))}</span>
            </div>
            <div className="flex flex-col justify-start items-center sm:justify-center gap-1 px-4 xsm:flex-row">
              <span className="font-semibold text-foreground">
                2K
              </span>
              <span className="text-sm sm:whitespace-nowrap">{capitalize(t("receiven_gift"))}</span>
            </div>
          </div>

          <div className="mx-auto max-ww-180 max-w-203">
            <Title className="font-semibold text-foreground">
              {t("about")+' '+getUsername(user.lastname, user.firstname)}
            </Title>
            <p className="mt-4.5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris
              tempus ut. Donec fermentum blandit aliquet. Etiam dictum
              dapibus ultricies. Sed vel aliquet libero. Nunc a augue
              fermentum, pharetra ligula sed, aliquam lacus.
            </p>

            {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"> */}
            <div className="mt-4.5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
                <EyeIcon fill="currentColor" size={20} />
              </CardDataStats>
              <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
                <CharetIcon fill="currentColor" size={20} />
              </CardDataStats>
              <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
                <ShoppingBagIcon fill="currentColor" size={22} />
              </CardDataStats>
              <CardDataStats title="Total Users" total="3.456" rate="0.95%" levelDown>
                <PeopleIcon fill="currentColor" size={22} />
              </CardDataStats>
            </div>
          </div>
        </div>
      </div>


      <Modal
        open={showEditModal} close={() => setShowEditModal(false)}
        title={`${t_table("editClient")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
      >
        <EditClient user={user} />
      </Modal>
    
      <Modal
        open={showSuspendModal} close={() => setShowSuspendModal(false)}
        title={`${t_table("suspendClient")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
      >
        <SuspendClient id={user?.id} status={user?.status} />
      </Modal>
      
      <Modal
        open={showDeleteModal} close={() => setShowDeleteModal(false)}
        title={`${t_table("deleteClient")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
      >
        <DeleteClient id={user?.id} />
      </Modal>

    </div>
    )}
    </>
  )
}
