"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import frLocale from "@fullcalendar/core/locales/fr";
import enLocale from "@fullcalendar/core/locales/en-gb";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { useLocale, useTranslations } from 'next-intl';
import { getCalendar, getReservationById } from "@/lib/action/admin/reservations";
import { signOut, useSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";
import { CommonSkeleton } from "../Skeletons";
import { Button, Chip, ChipProps, Link, Select, SelectItem } from "@nextui-org/react";
import { EventType, ReservationType } from "@/lib/definitions";
import { ReservationCard } from "../Card/Reservation";
import NewReservation from "./FormElements/Reservation/New";
import Loader from "./Common/Loader";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <div className="flex w-full flex-col rounded-sm border-l-[3px] border-primary bg-default bg-opacity-30 dark:bg-opacity-80 p-1 text-left">
        <span className="event-name text-sm font-semibold text-foreground truncate">
          {eventInfo.event.title}
        </span>
        <span className="time text-sm font-medium text-foreground">
          {eventInfo.timeText}
        </span>
        <span className="text-xs font-extralight text-foreground">
          {eventInfo.event.extendedProps.agency}
        </span>
        <span>
          <Chip
            className="capitalize border-none -ml-2 gap-1 -mt-2 -pt-2"
            color={
              eventInfo.event.extendedProps.state == "partially paid" ? statusColorMap["partially_paid"] : 
              eventInfo.event.extendedProps.state == "totally paid" ? statusColorMap["totally_paid"] : 
              statusColorMap[eventInfo.event.extendedProps.state]
            }
            size="sm"
            variant="light"
          >
            {eventInfo.event.extendedProps.state}
          </Chip>
        </span>
      </div>
    </>
  )
}

export default function Calendar() {
  const t_alert = useTranslations("Alert");
  const t_table = useTranslations("Table");
  const t_error = useTranslations("InputError");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showReservationModal, setShowReservationModal] = useState<boolean>(false);
  // const [selectedCell, setSelectedCell] = useState<any>();
  const [reservations, setReservations] = useState<EventType[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<EventType[]>([]);
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [reservation, setReservation] = useState<ReservationType>();

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_reservations", "show_all_reservation", "show_all_reservation_of_agency"];

  const new_reservation_permissions: string[] = ["manage_reservations", "create_reservation", "create_reservation_of_agency"];
  const view_reservation_permissions: string[] = ["manage_reservations", "view_reservation", "view_reservation_of_agency"];

  const clickOnCell = (info: any) => {
    console.log("date click on: ");
    // console.log(info);
    // setSelectedCell(info.dateStr);
    if(
      new_reservation_permissions.some(permission =>
      permissions.includes(permission))
    ) {
      setShowModal(true);
    }
  }

  const handleEventClick = (info: any) => {
    console.log("event click on ===============: ");
    const id = info.event.extendedProps.reservation_id;
    setError("");
    getReservationById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setReservation(response.reservation);
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
      setShowReservationModal(true);
  }

  useEffect(() => {
    setError("");
    getCalendar()
      .then(async (res) => {
        if(res?.ok){
          const reservations = await res.json();
          setReservations(reservations);
          setFilteredReservations(reservations);
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
  }, [permissions]);

  const agencies: string[] = Array.from(new Set(reservations.map((reservation) => reservation.agency)));

  const handleFilter = (agency: string) => {
    setAgencyFilter(agency);
    const filteredReservations = reservations.filter((reservation) => {
      if (agency === 'all') {
        return true;
      }
      return reservation.agency === agency;
    });
    setFilteredReservations(filteredReservations);
  };

  if (!reservations) {
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
            <div className="block md:hidden my-4 md:my-4">
              <Alert color="warning" message={t_alert("mobileDisplayWarning")} />
            </div>
            <div className="flex items-center gap-x-4 md:w-full justify-end mt-8">
              <Select
                selectedKeys={[agencyFilter]}
                defaultSelectedKeys={[agencyFilter]} size="md"
                labelPlacement="outside" aria-label="filter by agency"
                className="w-44 bg-background rounded-small" radius="sm"
                onChange={(e) => {
                  handleFilter(e.target.value);
                }}
              >
                {agencies.map((agency) => (
                  <SelectItem key={agency}>
                    {agency}
                  </SelectItem>
                ))}
                <SelectItem key="all">
                  {(locale === "en" ? "All agencies": "Toutes les agences")}
                </SelectItem>
              </Select>
            </div>

            <div className="bg-background rounded-small mt-7 p-4 md:p-5 relative">
              <FullCalendar
                dateClick={clickOnCell}
                locale={locale == "en" ? enLocale : frLocale}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
                // events={reservation3}
                events={filteredReservations}
                eventContent={renderEventContent}
                eventClick={handleEventClick}
                initialView="timeGridDay"
                headerToolbar={{
                  left: "dayGridMonth,timeGridWeek,timeGridDay",
                  center: "title",
                  // right: "prevYear,prev,next,nextYear today",
                  right: "prev,next today",
                }}
                nowIndicator={true}
                weekends={true}
                editable={true}
                /*
                selectable={true}
                selectMirror={true}
                fixedWeekCount={true}
                navLinks={true} // can click day/week names to navigate views
                dayMaxEvents={true}
                */
              />
            </div>

            <div>
              <Modal
                open={showModal} close={() => setShowModal(false)}
                title=""
              >
                <NewReservation />
              </Modal>
            </div>

            {/* reservation details */}
            <div>
              <Modal
                open={showReservationModal} close={() => setShowReservationModal(false)}
                title=""
              >
                {!reservation ? <Loader /> : (
                  <>
                    <ReservationCard reservation={reservation} />
                    <div
                      className={
                        view_reservation_permissions.some(permission =>
                        permissions.includes(permission)) ? "w-full block mb-4" : "hidden"
                      }
                    >
                      <Link
                        href={`/${locale}/admin/reservations/${reservation.id}`}
                        className="hover:no-underline w-full"
                      >
                        <Button
                          color="primary"
                          className="w-full uppercase truncate fomt-medium"
                        >
                          {t_table("view")}
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
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

