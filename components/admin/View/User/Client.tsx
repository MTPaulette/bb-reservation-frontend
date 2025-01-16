"use client"

import Image from "next/image";
import { CameraIcon } from "@/components/Icons";
import { getClientById } from '@/lib/action/admin/clients';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { getImageUrl, getUsername } from "@/lib/utils";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Tabs, Tab, Avatar } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditClient from "@/components/admin/FormElements/Client/Edit";
import DeleteClient from "@/components/admin/FormElements/Client/Delete";
import SuspendClient from '@/components/admin/FormElements/Client/Suspend';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Alert from "@/components/Alert";
import Link from "next/link";
import { columnsTabsClientCoupon } from "@/lib/data";
import DefaultCouponTable from "../../Tables/DefaultCouponTable";
import DefaultReservationTable from "../../Tables/DefaultReservationTable";

export default function ViewClient({id}: {id: string}) {
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
  const requiredPermissions: string[] = ["view_client"];

  const update_client_permissions: string[] = ["edit_client"];
  const delete_client_permissions: string[] = ["delete_client"];

  const view_staff_permissions: string[] = ["view_admin", "view_admin_of_agency", "view_superadmin"];

  useEffect(() => {
    setError("");
    getClientById(Number(id))
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
  }, []);


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
          <div className={`${response.user.id == authUserId? 'absolute': 'hidden'} bottom-1 right-1 z-1 xsm:bottom-4 xsm:right-4`}>
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
          <div className="relative z-3 mx-auto flex justify-center items-center -mt-24 sm:-mt-12 md:-mt-32 lg:-mt-40 xl:-mt-24 h-32 w-full max-w-30 sm:h-44 sm:max-w-44">
            <div className="relative drop-shadow-2 h-25 w-25 sm:h-30 sm:w-30 md:h-40 md:w-40">
              <Avatar
                src={response.user && response.user.image? getImageUrl(response.user.image): ""}
                isBordered
                color={response.user.status == 'active'? 'success': 'danger'}
                className="rounded-full h-full w-full"
                alt="profile pic"
              />

              <label
                htmlFor="profile"
                className={`${response.user.id == authUserId? 'absolute': 'hidden'} bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2`}
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
                        update_client_permissions.some(permission =>
                        permissions.includes(permission)) ? "block" : "hidden"
                      }
                      onClick={() => {
                        setShowEditModal(true);
                      }}
                    >{t_table("edit")}</DropdownItem>
                    {/* <DropdownItem
                      color="warning"
                      onClick={() => {
                        setShowSuspendModal(true);
                      }}
                    >{response.user.status == 'active'? t_table("suspend"): t_table("cancel_suspend")}</DropdownItem> */}
                    <DropdownItem
                      className={
                        delete_client_permissions.some(permission =>
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

            <p className="font-medium capitalize"> {response.user.role} {response.user.agency? ' | '+ response.user.agency: ""}</p>
            <p className="mt-2 font-light"> {response.user.email} {response.user.phonenumber? ' | '+ response.user.phonenumber: ""}</p>
            <div className="mx-auto mb-5.5 mt-4.5 grid maxx-w-94 max-w-150 grid-cols-2 rounded-md border border-divider py-2.5 shadow-1 dark:bg-content2">
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

            <div className="mx-auto max-w-203">
              <Title className="font-semibold text-foreground">
                {t("about")+' '+getUsername(response.user.lastname, response.user.firstname)}
              </Title>
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
                key="coupons"
                title={t_tabs("coupons")}
              >
                {response.coupons && response.coupons.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultCouponTable columns={columnsTabsClientCoupon} coupons={response.coupons} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_client")} />
                  </div>
                )}
              </Tab>
              <Tab key="reservations" title={t_tabs("reservations")}>
                {response.reservations && response.reservations.length > 0 ? (
                  <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default mt-2 px-3 py-5 antialiased">
                    <DefaultReservationTable reservations={response.reservations} />
                  </div>
                ): (
                  <div className="mt-2 px-3 py-5">
                    <Alert color="default" message={t_alert("no_reservation")} />
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
          title={`${t_table("editClient")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <EditClient user={response.user} />
        </Modal>
      
        <Modal
          open={showSuspendModal} close={() => setShowSuspendModal(false)}
          title={`${t_table("suspendClient")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <SuspendClient id={response.user?.id} status={response.user?.status} />
        </Modal>
        
        <Modal
          open={showDeleteModal} close={() => setShowDeleteModal(false)}
          title={`${t_table("deleteClient")} "${response.user? getUsername(response.user.lastname, response.user.firstname): ""}"`}
        >
          <DeleteClient id={response.user?.id} />
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