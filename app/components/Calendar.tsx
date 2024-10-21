"use client";

import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import frLocale from "@fullcalendar/core/locales/fr";
import Modal from "@/app/components/Modal";
import Alert from "@/app/components/Alert";

const events = [
  { title: "Meeting", start: new Date() },
  { title: "conception et modelisation", start: new Date("2024/10/13 18:00:00"), end: new Date("2024/10/13 19:00:00") },
  { title: "design graphique", start: new Date("2024/10/17 8:00:00"), end: new Date("2024/10/17 10:00:00") },
  { title: "midday event", start: new Date("2024/10/20 8:00:00"), end: new Date("2024/10/20 14:00:00") },
  { title: "allday event", start: new Date("2024/09/27 00:00:00"), end: new Date("2024/09/27 23:59") },
  { title: "all the day", start: new Date("2024/10/28 8:00:00"), end: new Date("2024/10/29 14:00:00") },
  { title: "break", date: new Date("2024/10/19") },
]

const renderEventContent = (eventInfo: any) => {
  return (
    <>
      <div className="w-full h-auto items-center overflow-hidden bg-success/30 text-tiny text-foreground p-1 rounded">
        <p className="font-semibold italic whitespace-break-spaces">{eventInfo.event.title}</p>
        <p>{eventInfo.timeText} &nbsp;</p>
      </div>
    </>
  )
}

export default function Calendar() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [selectedCell, setSelectedCell] = React.useState<any>();


  const clickOnCell = (info: any) => {
    console.log("clicked on: ");
    console.log(info);
    setSelectedCell(info.dateStr);
    setShowModal(true);
  }

  return (
    <>
    <div className="block md:hidden my-4 md:my-4">
      <Alert color="warning" message="Faites pivoter votre appareil en position horizontale pour voir un meilleur rendu du calendrier" />
    </div>
    <div className="bg-background rounded-small mt-7 p-4 md:p-5">
      <Modal
        open={showModal} close={() => setShowModal(false)}
        title="Etat des réservations"
      >
        {selectedCell} <br />
        Lorem ipsum dolor sit, amet consectetur adipisic
        ing elit. Possimus nulla ex sunt earum nesciunt ducimus error! Libero eligendi quis cumque saepe autem eveniet eiu
        s temporibus, perferendis, doloremque pariatur nihil aliquam.
      </Modal>
      <FullCalendar
        dateClick={clickOnCell}
        locale={frLocale}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        events={events}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "today prev,next"
        }}
        nowIndicator={true}
        weekends={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        fixedWeekCount={true}
      />
    </div>
    </>
  );
};
