"use client"

import Image from "next/image";
import { getStaffById } from '@/lib/action/admin/staff';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, formatDateTime, getImageUrl, getUsername } from "@/lib/utils";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Tabs, Tab, Avatar } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditStaff from "@/components/admin/formElements/staff/Edit";
import DeleteStaff from "@/components/admin/formElements/staff/Delete";
import SuspendStaff from '@/components/admin/formElements/staff/Suspend';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from "next/link";
import Alert from "@/components/Alert";
import DefaultRessourceTable from "../../tables/DefaultRessourceTable";
import DefaultUserTable from "../../tables/DefaultUserTable";
import { columnsTabsStaffStaff, columnsTabsClientStaff, columnsTabsStaffCoupon } from "@/lib/data";
import DefaultCouponTable from "../../tables/DefaultCouponTable";
import DefaultReservationTable from "../../tables/DefaultReservationTable";

export default function ViewStaff({id}: {id: string}) {
  const { data: session } = useSession();
  const authUserId = session?.user.id;
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showSuspendModal, setShowSuspendModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [notFoundStatus, setNotFoundStatus] = useState(false);
  const [error, setError] = useState<string>("");
  const t = useTranslations("Profile");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_tabs = useTranslations("Tabs");
  const t_alert = useTranslations("Alert");
  const t_statistic = useTranslations("Statistic");
  const [selected, setSelected] = useState<string>("reservations");
  const [response, setResponse] = useState([]);
  
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];

  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];
  const update_staff_permissions: string[] = ["edit_admin", "edit_superadmin"];
  const delete_staff_permissions: string[] = ["delete_admin", "delete_superadmin"];
  const suspend_staff_permissions: string[] = ["suspend_staff"];

  const view_agency_permissions: string[] = ["manage_agency", "manage_all_agencies"];

  useEffect(() => {
    setError("");
    getStaffById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setResponse(response);
          setLoading(false);
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
              // setError(t_error("server_not_found"));
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
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, [id, locale, t_error]);


  // if (!response) {
  if (notFoundStatus) {
    notFound();
  }

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
          <div className="relative z-3 mx-auto flex justify-center items-center -mt-24 sm:-mt-12 md:-mt-32 lg:-mt-40 xl:-mt-24 h-32 w-full max-w-30 sm:h-44 sm:max-w-44">
            <div className="relative drop-shadow-2 h-25 w-25 sm:h-30 sm:w-30 md:h-40 md:w-40">
              <Avatar
                src={response.user && response.user.image? getImageUrl(response.user.image): ""}
                isBordered
                color={response.user.status == 'active'? 'success': 'danger'}
                className="rounded-full h-full w-full"
                alt="profile pic"
              />
            </div>
          </div>
          <div className="mt-4">
            
            <div className="relative flex justify-center items-center gap-1">
              <Title className="text-2xl font-semibold text-foreground">
                {getUsername(response.user.lastname, response.user.firstname)}
              </Title>
              <div className={`${response.user.id == authUserId? 'hidden': 'relative'}`}>
                <Dropdown className="bg-background border-1 border-default-200">
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="light" className="z-2">
                      <VerticalDotsIcon fill="none" size={24} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    <DropdownItem
                      className={
                        update_staff_permissions.some(permission =>
                        permissions.includes(permission)) ? "block" : "hidden"
                      }
                      onClick={() => {
                        setShowEditModal(true);
                      }}
                    >{t_table("edit")}</DropdownItem>
                    <DropdownItem
                      className={
                        suspend_staff_permissions.some(permission =>
                        permissions.includes(permission)) ? "block" : "hidden"
                      }
                      color="warning"
                      onClick={() => {
                        setShowSuspendModal(true);
                      }}
                    >{response.user.status == 'active'? t_table("suspend"): t_table("cancel_suspend")}</DropdownItem>
                    <DropdownItem
                      className={
                        delete_staff_permissions.some(permission =>
                        permissions.includes(permission)) ? "block" : "hidden"
                      }
                      color="danger"
                      onClick={() => {
                        setShowDeleteModal(true);
                      }}
                    >{t_table("delete")}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <p className="mt-2 font-light">
              {response.user.email} {response.user.phonenumber? ' | '+ response.user.phonenumber: ""}
            </p>
            <p className="font-semibold capitalize mt-1">
              {response.user.role ? response.user.role.name : ""}
            </p>
            <div className="mx-auto mb-5.5 mt-4.5 grid maxx-w-94 max-w-150 grid-cols-2 sm:grid-cols-3 gap-2 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2">
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalCreatedClients}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_clients")} </span>
              </div>
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalCreatedStaff}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_administrators")} </span>
              </div>
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalRessources}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_ressources")} </span>
              </div>
            {/* </div>

            <div className="mx-auto mb-5.5 mt-4.5 grid maxx-w-94 max-w-150 grid-cols-2 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2"> */}
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 border-r border-divider px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalReservations}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_reservations")} </span>
              </div>
              <div className="flex flex-col justify-start items-center sm:justify-center gap-1 px-4 xsm:flex-row">
                <span className="font-semibold text-foreground">
                  {response.totalCoupons}
                </span>
                <span className="text-sm sm:whitespace-nowrap truncate">{t_statistic("total_coupons")} </span>
              </div>
            </div>

            <div className="mx-auto max-w-203 flex flex-col items-center">
              <Title className="font-semibold text-foreground">
                {t("about")+' '+getUsername(response.user.lastname, response.user.firstname)}
              </Title>
              <>
              {!permissions || !response.user.work_at ? null : (
                <>
                {view_agency_permissions.some(permission =>
                permissions.includes(permission)) ? (
                  <p className="mt-1 font-light text-tiny"> {t_table("work_at")}:
                    <Link href={`/${locale}/admin/agencies/${response.user.work_at.id}`} className="font-medium ms-2">
                      {response.user.work_at.name?
                        capitalize(response.user.work_at.name)
                      : ""}
                    </Link>
                  </p>
                ): (
                  <p className="mt-1 font-light text-tiny"> {t_tabs("created_by")}:
                    <span className="font-medium ms-2">
                      {response.user.work_at.name?
                        capitalize(response.user.work_at.name)
                      : ""}
                    </span>
                  </p>
                )}
                </>
              )}
              </>

              <>
              {!permissions || !response.user.created_by ? null : (
                <>
                {view_staff_permissions.some(permission =>
                permissions.includes(permission)) ? (
                  <p className="mt-1 font-light text-tiny"> {t_table("created_by")}:
                    <Link href={`/${locale}/admin/staff/${response.user.created_by.id}`} className="font-medium ms-2">
                      {response.user.created_by.firstname && response.user.created_by.lastname? getUsername(response.user.created_by.lastname, response.user.created_by.firstname): ""}
                    </Link>
                  </p>
                ): (
                  <p className="mt-1 font-light text-tiny"> {t_tabs("created_by")}:
                    <span className="font-medium ms-2">
                      {response.user.created_by.firstname && response.user.created_by.lastname? getUsername(response.user.created_by.lastname, response.user.created_by.firstname): ""}
                    </span>
                  </p>
                )}
                </>
              )}
              </>

              {response.user.created_at? (
                <p className="mt-1 font-light text-tiny whitespace-nowrap">{t_table("since")}: {formatDateTime(response.user.created_at)}</p>
              ): ""}

              <div
                className={`my-3 inline-block rounded px-1.5 py-0.5 uppercase font-bold text-sm text-white
                ${response.user.status == "active"? "bg-success" :"bg-danger"}`}
              >{response.user.status}</div>
              
              <>
                {!permissions || response.user.status != 'suspended' || !response.user.suspended_by ? null : (
                  <>
                  {view_staff_permissions.some(permission =>
                  permissions.includes(permission)) ? (
                    <p className="font-light text-tiny"> {t_table("suspended_by")}:
                      <Link href={`/${locale}/admin/staff/${response.user.suspended_by.id}`} className="font-medium ms-2">
                        {response.user.suspended_by.firstname && response.user.suspended_by.lastname ?
                          getUsername(response.user.suspended_by.lastname, response.user.suspended_by.firstname)
                        : ""}
                      </Link>
                    </p>
                  ): (
                    <p className="mt-1 font-light text-tiny"> {t_tabs("suspended_by")}:
                      <span className="font-medium ms-2">
                        {response.user.suspended_by.firstname && response.user.suspended_by.lastname ?
                            getUsername(response.user.suspended_by.lastname, response.user.suspended_by.firstname)
                          : ""}
                      </span>
                    </p>
                  )}

                  <div className="mt-1.5 font-light text-tiny text-danger">
                    <p>{t_tabs("reason_for_suspension")}:</p>
                    <p className="font-medium">
                      {locale === "en" ? response.user.reason_for_suspension_en: response.user.reason_for_suspension_fr}
                    </p>
                  </div>
                  </>
                )}
              </>
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
                {response.createdStaff.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultUserTable columns={columnsTabsStaffStaff} users={response.createdStaff} />
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
                {response.createdClients.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultUserTable columns={columnsTabsClientStaff} users={response.createdClients} />
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
                {response.coupons.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultCouponTable columns={columnsTabsStaffCoupon} coupons={response.coupons} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_client")} />
                  </div>
                )}
              </Tab>
              <Tab key="reservations" title={t_tabs("reservations")}>
                {response.reservations.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultReservationTable reservations={response.reservations} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_reservation")} />
                  </div>
                )}
              </Tab>
              <Tab key="ressources" title={t_tabs("ressources")}>
                {response.ressources.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultRessourceTable ressources={response.ressources} />
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
          title={`${t_table("editStaff")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <EditStaff user={response.user} />
        </Modal>
      
        <Modal
          open={showSuspendModal} close={() => setShowSuspendModal(false)}
          title={`${t_table("suspendStaff")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <SuspendStaff id={response.user?.id} status={response.user?.status} />
        </Modal>
        
        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteStaff")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <DeleteStaff id={response.user?.id} />
        </Modal>

      </div>
    </>
    )}
    </>
    }
    </div>
    </>
    )}
    </>
  );
}