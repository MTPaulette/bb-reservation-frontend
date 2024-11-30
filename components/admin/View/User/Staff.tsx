"use client"

import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getStaffById } from '@/lib/action/staff';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Tabs, Tab } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditStaff from "@/components/admin/FormElements/Staff/Edit";
import DeleteStaff from "@/components/admin/FormElements/Staff/Delete";
import SuspendStaff from '@/components/admin/FormElements/Staff/Suspend';
import { signOut } from 'next-auth/react';
import Link from "next/link";
import Alert from "@/components/Alert";
import DefaultRessourceTable from "../../Tables/DefaultRessourceTable";
import DefaultUserTable from "../../Tables/DefaultUserTable";
import { columnsTabsStaffStaff, columnsTabsClientStaff, columnsTabsRessourceStaff, columnsTabsStaffCoupon } from "@/lib/data";
import DefaultCouponTable from "../../Tables/DefaultCouponTable";
import CardWrapper from "../../DataStats/Card2";

export default function ViewStaff({id}: {id: string}) {
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
  const t_tabs = useTranslations("Tabs");
  const t_alert = useTranslations("Alert");
  const [selected, setSelected] = React.useState<string>("reservations");
  const [createdClients, setCreatedClients] = useState([]);
  const [createdStaff, setCreatedStaff] = useState([]);
  const [ressources, setRessources] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    setError("");
    getStaffById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setUser(response.user);
          setRessources(response.ressources);
          setCoupons(response.coupons);
          setCreatedClients(response.created_clients);
          setCreatedStaff(response.created_staff);
          setLoading(false);
        }else {
          const status = res.status;
          switch(status) {
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
    ) :
    <>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <>
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
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className={`relative z-3 mx-auto flex justify-center items-center -mt-22 h-32 w-full max-w-30 sm:h-44 sm:max-w-44 sm:p-3 rounded-full p-1 backdrop-blur bg-opacity-40 dark:bg-opacity-70 ${user.status == 'active'? 'bg-success': 'bg-danger'}`}>
          {/* <div className="relative z-3 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full p-1 bg-white/20 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3"> */}
            <div className="relative drop-shadow-2 h-30 w-30 sm:h-40 sm:w-40">
              <Image
                src={user && user.image? getImageUrl(user.image): "/images/brain-orange-400.png"}
                width={160}
                height={160}
                className="rounded-full h-full w-full"
                alt="profile"
              />
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

            <div className="mx-auto max-w-203 flex flex-col items-center">
              <Title className="font-semibold text-foreground">
                {t("about")+' '+getUsername(user.lastname, user.firstname)}
              </Title>
              {user.work_at ? (
                <p className="mt-1 font-light text-tiny"> {t_table("work_at")}:
                  <Link href={`/${locale}/admin/agencies/${user.work_at.id}`} className="font-medium ms-2">
                    {user.work_at.name?
                      capitalize(user.work_at.name)
                    : ""}
                  </Link>
                </p>
              ): null }
              {user.created_by ? (
                <p className="mt-1 font-light text-tiny"> {t_table("created_by")}:
                  <Link href={`/${locale}/admin/staff/${user.created_by.id}`} className="font-medium ms-2">
                    {user.created_by.firstname && user.created_by.lastname ?
                      getUsername(user.created_by.lastname, user.created_by.firstname)
                    : ""}
                  </Link>
                </p>
              ): null }
              {user.created_at? (
                <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_table("since")}: {formatDateTime(user.created_at)}</p>
              ): ""}

              <div
                className={`my-3 inline-block rounded px-1.5 py-0.5 uppercase font-bold text-sm text-white
                ${user.status == "active"? "bg-success" :"bg-danger"}`}
              >{user.status}</div>
              <div>
                {user.status == 'suspended' && user.suspended_by ? (
                  <p className="font-light text-tiny"> {t_table("suspended_by")}:
                    <Link href={`/${locale}/admin/staff/${user.suspended_by.id}`} className="font-medium ms-2">
                      {user.suspended_by.firstname && user.suspended_by.lastname ?
                        getUsername(user.suspended_by.lastname, user.suspended_by.firstname)
                      : ""}
                    </Link>
                  </p>
                ): null }
              </div>

              <div>
                {user.status != "active" ? (
                  <p className="mt-4.5">
                    {locale === "en" ? user.reason_for_suspension_en: user.reason_for_suspension_fr}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque posuere fermentum urna, eu condimentum mauris
                    tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                    dapibus ultricies. Sed vel aliquet libero. Nunc a augue
                    fermentum, pharetra ligula sed, aliquam lacus.
                  </p>
                ): null}
              </div>

              {/* stats */}
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6 py-4 md:py-6">
                <CardWrapper />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 md:gap-8">
        <div className="col-span-12 mt-6 md:mt-8 py-6 md:py-8 border-t border-divider z-1">
          <div className="flex w-full flex-col">
            <Tabs
              fullWidth
              aria-label="Options"
              color="primary"
              radius="sm"
              variant="solid"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab 
                key="administrators"
                title={t_tabs("administrators")}
              >
                {createdStaff.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultUserTable columns={columnsTabsStaffStaff} users={createdStaff} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_administrator")} />
                  </div>
                )}
              </Tab>
              <Tab 
                key="clients"
                title={t_tabs("clients")}
              >
                {createdClients.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultUserTable columns={columnsTabsClientStaff} users={createdClients} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_client")} />
                  </div>
                )}
              </Tab>
              <Tab 
                key="coupons"
                title={t_tabs("coupons")}
              >
                {coupons.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultCouponTable columns={columnsTabsStaffCoupon} coupons={coupons} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_client")} />
                  </div>
                )}
              </Tab>
              <Tab key="reservations" title={t_tabs("reservations")}>
                <Tabs
                  isVertical
                  aria-label="Reservations" 
                  color="primary"
                  radius="sm"
                  variant="solid"
                >
                  <Tab key="photos" title="Photos">
                    <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                      photo
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </Tab>
                  <Tab key="music" title="Music">
                    <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                      music
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </Tab>
                  <Tab key="videos" title="Videos">
                    <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                      videos
                      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  </Tab>
                </Tabs>
              </Tab>
              <Tab key="ressources" title={t_tabs("ressources")}>
                {ressources.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultRessourceTable columns={columnsTabsRessourceStaff} ressources={ressources} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_ressource")} />
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <div>
        <Modal
          open={showEditModal} close={() => setShowEditModal(false)}
          title={`${t_table("editStaff")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
        >
          <EditStaff user={user} />
        </Modal>
      
        <Modal
          open={showSuspendModal} close={() => setShowSuspendModal(false)}
          title={`${t_table("suspendStaff")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
        >
          <SuspendStaff id={user?.id} status={user?.status} />
        </Modal>
        
        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteStaff")} "${user? getUsername(user.lastname, user.firstname): ""}"`}
        >
          <DeleteStaff id={user?.id} />
        </Modal>

      </div>
    </>
    )}
    </>
    }
    </div>
    </>
  )
}