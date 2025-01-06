"use client";

import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import frLocale from "@fullcalendar/core/locales/fr";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { useLocale, useTranslations } from 'next-intl';
import { getCalendar } from "@/lib/action/reservations";
import { signOut, useSession } from "next-auth/react";
import { notFound, redirect } from "next/navigation";
import { CommonSkeleton } from "../Skeletons";
import { Chip, ChipProps, Button, Select, SelectItem } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  pending: "warning",
  partially_paid : "primary",
  confirmed : "success",
  totally_paid: "success",
  cancelled: "danger"
};

const reservationss = [
  { title: "Meeting", start: new Date() },
  { title: "conception et modelisation", start: new Date("2024/10/13 18:00:00"), end: new Date("2024/10/13 19:00:00") },
  { title: "design graphique", start: new Date("2024/10/17 8:00:00"), end: new Date("2024/10/17 10:00:00") },
  { title: "midday reservation", start: new Date("2024/10/20 8:00:00"), end: new Date("2024/10/20 14:00:00") },
  { title: "allday reservation", start: new Date("2024/09/27 00:00:00"), end: new Date("2024/09/27 23:59") },
  { title: "all the day", start: new Date("2024/10/28 8:00:00"), end: new Date("2024/10/29 14:00:00") },
  { title: "break", date: new Date("2024/10/19") },
  {
    title: 'All Day Reservation',
    start: '2020-09-01'
  },
  {
    title: 'Long Reservation',
    start: '2020-09-07',
    end: '2020-09-10'
  },
  {
    groupId: 999,
    title: 'Repeating Reservation',
    start: '2020-09-09T16:00:00'
  },
  {
    groupId: 999,
    title: 'Repeating Reservation',
    start: '2020-09-16T16:00:00'
  },
  {
    title: 'Conference',
    start: '2020-09-11',
    end: '2020-09-13'
  },
  {
    title: 'Meeting',
    start: '2020-09-12T10:30:00',
    end: '2020-09-12T12:30:00'
  },
  {
    title: 'Lunch',
    start: '2020-09-12T12:00:00'
  },
  {
    title: 'Meeting',
    start: '2020-09-12T14:30:00'
  },
  {
    title: 'Happy Hour',
    start: '2020-09-12T17:30:00'
  },
  {
    title: 'Dinner',
    start: '2020-09-12T20:00:00'
  },
  {
    title: 'Birthday Party',
    start: '2020-09-13T07:00:00'
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2024-12-28 08:00',
    end: '2024-12-28 10:00',
  }
]

const reservation3 = [
  {
    title: "Creator's 2",
    agency: "Etoa-Meki",
    start: "2024-12-14 08:00",
    end: "2024-12-15 19:00"
  },
  {
    title: "Game Changer Room",
    agency: "Etoa-Meki",
    start: "2024-12-20 08:00",
    end: "2024-12-29 19:00"
  },
  {
    title: "Game Changer Room",
    agency: "Etoa-Meki",
    start: "2024-12-30 08:00",
    end: "2025-01-19 19:00"
  },
  {
    title: "Grand Bureau Privé",
    agency: "Etoa-Meki",
    start: "2025-03-08 08:00",
    end: "2025-03-08 19:00"
  },
  {
    title: "Game Changer Room",
    agency: "Etoa-Meki",
    start: "2024-12-30 10:00",
    end: "2025-01-19 18:00"
  },
  {
    title: "Meeting Corner",
    agency: "Etoa-Meki",
    start: "2025-01-06 13:00",
    end: "2025-01-06 18:00"
  },
  {
    title: "The Good Deal",
    agency: "Etoa-Meki",
    start: "2025-01-10 08:00",
    end: "2025-01-11 18:00"
  },
  {
    title: "Creator's 2",
    agency: "Etoa-Meki",
    start: "2024-12-30 16:00",
    end: "2024-12-30 17:00"
  },
  {
    title: "Game Changer Room",
    agency: "Etoa-Meki",
    start: "2024-12-23 08:00",
    end: "2025-01-02 18:00"
  },
  {
    title: "The Good Deal",
    agency: "Etoa-Meki",
    start: "2024-12-27 08:00",
    end: "2024-12-27 09:00"
  },
  {
    title: "Master Mind",
    agency: "Etoa-Meki",
    start: "2024-12-30 08:00",
    end: "2025-01-19 13:00"
  },
  {
    title: "Master Mind",
    agency: "Etoa-Meki",
    start: "2024-12-21 13:00",
    end: "2024-12-21 18:00"
  },
  {
    title: "The Good Deal",
    agency: "Etoa-Meki",
    start: "2024-12-16 08:00",
    end: "2024-12-17 18:00"
  },
  {
    title: "Master Mind",
    agency: "Etoa-Meki",
    start: "2024-12-30 08:00",
    end: "2025-01-19 18:00"
  },
  {
    title: "Grand Bureau Privé",
    agency: "Etoa-Meki",
    start: "2025-01-04 11:00",
    end: "2025-01-04 12:00"
  },
  {
    title: "Grand Bureau Privé",
    agency: "Etoa-Meki",
    start: "2025-01-04 11:00",
    end: "2025-01-04 12:00"
  },
  {
    title: "Grand Bureau Privé",
    agency: "Etoa-Meki",
    start: "2025-01-04 11:00",
    end: "2025-01-04 12:00"
  },
  {
    title: "Creator's 1",
    agency: "Etoa-Meki",
    start: "2024-12-18 10:00",
    end: "2024-12-18 13:00"
  },
  {
    title: "Creator's 1",
    agency: "Etoa-Meki",
    start: "2024-12-18 10:00",
    end: "2024-12-18 13:00"
  }
]

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
  const t_error = useTranslations("InputError");
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedCell, setSelectedCell] = React.useState<any>();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [agencyFilter, setAgencyFilter] = React.useState<string>("all");
  const locale = useLocale();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const { data: session } = useSession();
  const permissions = session?.permissions;
  const requiredPermissions: string[] = ["manage_reservations", "show_all_reservation", "show_all_reservation_of_agency"];

  const clickOnCell = (info: any) => {
    console.log("clicked on: ");
    console.log(info);
    setSelectedCell(info.dateStr);
    setShowModal(true);
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
            {/* <div className="flex items-center gap-x-4 md:w-full md:justify-end md:mt-4">
              {agencies.map((agency, index) => (
                <Button
                  key={index}
                  disableRipple
                  radius="md"
                  className={`data-[hover=true]:bg-default ${agencyFilter === agency ? "text-white bg-primary" : "text-foreground/50 bg-transparent"}`}
                  onClick={() => handleFilter(agency)}
                >
                  {agency}
                </Button>
              ))}
              <Button
                disableRipple
                radius="md"
                className={`data-[hover=true]:bg-default ${agencyFilter === "all" ? "text-white bg-primary" : "text-foreground/50 bg-transparent"}`}
                onClick={() => handleFilter("all")}
              >
                {(locale === "en" ? "All agencies": "Toutes les agences")}
              </Button>
            </div> */}
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
                locale={frLocale}
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                ]}
                // events={reservation3}
                events={filteredReservations}
                eventContent={renderEventContent}
                initialView="dayGridMonth"
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
                title="Etat des réservations"
              >
                {selectedCell} <br />
                Lorem ipsum dolor sit, amet consectetur adipisic
                ing elit. Possimus nulla ex sunt earum nesciunt ducimus error! Libero eligendi quis cumque saepe autem eveniet eiu
                s temporibus, perferendis, doloremque pariatur nihil aliquam.
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
