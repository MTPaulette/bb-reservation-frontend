"use client";

import { useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import frLocale from "@fullcalendar/core/locales/fr";
import enLocale from "@fullcalendar/core/locales/en-gb";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import { useLocale, useTranslations } from 'next-intl';
import { Select, SelectItem } from "@nextui-org/react";
import { EventInfoType, EventType } from "@/lib/definitions";

const renderEventContent = (eventInfo: EventInfoType) => {
  return (
    <>
      {/* <div className="flex w-full flex-col rounded-sm border-l-[3px] border-primary bg-default bg-opacity-30 dark:bg-opacity-80 p-1 text-left"> */}
      <div className="flex w-full flex-col rounded-sm border-l-[3px] p-1 text-left">
        <span className="event-name text-sm font-semibold text-foreground truncate">
        {eventInfo.event.title}
        </span>
        <span className="time text-xs font-medium text-foreground">
          {eventInfo.timeText}
        </span>
        <span className="text-xs font-extralight text-foreground">
          {eventInfo.event.extendedProps.agency}
        </span>
      </div>
    </>
  )
}

export default function Calendar({ events }: { events: EventType[] }) {
  const t_alert = useTranslations("Alert");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<string>();
  const [filteredEvents, setFilteredEvents] = useState<EventType[]>(events);
  const [agencyFilter, setAgencyFilter] = useState<string>("all");
  const locale = useLocale();


  const clickOnCell = (info: EventInfoType) => {
    console.log("clicked on: ");
    console.log(info);
    setSelectedCell(info.dateStr);
    setShowModal(true);
  }

  const agencies: string[] = Array.from(new Set(events.map((event: EventType) => event.agency)));

  const handleFilter = (agency: string) => {
    setAgencyFilter(agency);
    const filteredEvents = events.filter((event) => {
      if (agency === 'all') {
        return true;
      }
      return event.agency === agency;
    });
    setFilteredEvents(filteredEvents);
  };

  return (
    <>
    <div className="block md:hidden my-4 md:my-4">
      <Alert color="warning" message={t_alert("mobileDisplayWarning")} />
    </div>
    <div className="flex items-center gap-x-4 md:w-full justify-start mt-8">
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
        // events={event3}
        events={filteredEvents}
        eventContent={renderEventContent}
        initialView="timeGridDay"
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
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
  );
};
