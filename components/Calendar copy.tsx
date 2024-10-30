"use client";

import React, {useRef} from "react";

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

import { Button } from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import PeriodFilter from "@/components/PeriodFilter"


import frLocale from "@fullcalendar/core/locales/fr"


const events = [
  { title: "Meeting", start: new Date() },
  { title: "conception et modelisation", start: new Date("2024/10/13 18:00:00"), end: new Date("2024/10/13 19:00:00") },
  { title: "design graphique", start: new Date("2024/10/17 8:00:00"), end: new Date("2024/10/17 10:00:00") },
  { title: "midday event", start: new Date("2024/10/20 8:00:00"), end: new Date("2024/10/20 14:00:00") },
  { title: "allday event", start: new Date("2024/09/27 00:00:00"), end: new Date("2024/09/27 23:59") },
  { title: "all the day", start: new Date("2024/10/28 8:00:00"), end: new Date("2024/10/29 14:00:00") },
  { title: "break", date: new Date("2024/10/19") },
]

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText} &nbsp;</b>
      <i className="whitespace-break-spaces">{eventInfo.event.title}</i>
    </>
  )
}


export default function Calendar() {
  const calendarRef = useRef();
  
  const handlePreviousClick = () => {
    const calendarAPI = calendarRef?.current?.getApi();
    calendarAPI?.prev();
  }

  /**
   * gestion des periods
   */
  const [period, setPeriod] = React.useState<string>("day");
  const PrevButton = () => {
    return (
    <Button
      onClick={() => handlePreviousClick()}
      isIconOnly radius="md" size="sm"
      className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
      aria-label="vue de carte"
    >
      <ChevronLeftIcon className="w-5" />
    </Button>
  )}

  const pressToday_prev_next = (active_period: string) => {
    const calendarAPI = calendarRef?.current?.getApi();
    alert(active_period)
    if(active_period == "prev") {
      calendarAPI?.prev();
    }
    if(active_period == "next") {
      calendarAPI?.next();
    }
    if(active_period == "today") {
      calendarAPI?.today();
    }
    
  }


  return (
    <div>
      <PeriodFilter 
        changePeriod={(period: string) => setPeriod(period)}
        onChange={pressToday_prev_next}
      />
      {/* <PrevButton /> */}
    <div className="bg-background rounded-small p-4 md:p-5">
      <FullCalendar
        dateClick={(info) => { console.log("clicked on: "); console.log(info)}}
        locale={frLocale}
        defaultAllDay={false}
        // weekNumberCalculation="ISO"
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
        events={events}
        eventContent={renderEventContent}
        initialView="dayGridMonth"

        ref={calendarRef}
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
        // eventColor= "#0B9444"
      />
    </div>
    </div>
  );
};
