"use client";

import React from "react";
import { today, getLocalTimeZone } from "@internationalized/date";

import { Button } from "@nextui-org/react";
import { CalendarIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";

import Title from "@/app/components/Title"
import SelectFilter from "@/app/components/SelectFilter"
import PeriodFilter from "@/app/components/PeriodFilter"
import Calendar from "@/app/components/calendar/Calendar"
import FindRessource from "@/app/components/FindRessource"

import _agencies from '@/app/database/Agencies'
import _validities from "@/app/database/Validities.js"
import _service_types from "@/app/database/Service_types.js"


export default function Reservations({
  searchParams,
}: {
  searchParams?: {
    agency?: string;
    validity?: string;
    service_type?: string;
  };
}) {
  
  const agency = searchParams?.agency || '';
  const validity = searchParams?.validity || '';
  const service_type = searchParams?.service_type || '';

  const allFilters = [
    { label: "Agence", queryName: "agency", placeholder: "Selectionner une agence", items: _agencies },
    { label: "Validité", queryName: "validity", placeholder: "Selectionner une validité", items: _validities },
    { label: "Type de service", queryName: "service_type", placeholder: "Selectionner un type", items: _service_types },
  ];

  const [calendarDisplay, setCalendarDisplay] = React.useState<boolean>(true);
  const toggledisplaymode = (mode: boolean) => {
    setCalendarDisplay(mode);
  };


  /**
   * gestion des periods
   */
  const [period, setPeriod] = React.useState<string>("day");
  const [activePeriod, setActivePeriod] = React.useState<string>(today(getLocalTimeZone()).toString());
  const pressToday_prev_next = (active_period: string) => {
    setActivePeriod(active_period);
  }


  function DisplayElement({
    calendarDisplay, period, activePeriod
  } : { 
    calendarDisplay: boolean, period: string, activePeriod: string
  }) {
    if(calendarDisplay){
      return (
        <div>
          <PeriodFilter 
            changePeriod={(period: string) => setPeriod(period)}
            onChange={pressToday_prev_next}
          />
          <div className="bg-background rounded-small p-4 md:p-5">
            <Calendar period={period} activePeriod={activePeriod} />
          </div>
        </div>
      )
    } else {
      return (
        <div> 
          <FindRessource />
          <div className="bg-background rounded-small p-4 md:p-5">
            card
            </div>
        </div>
      )
    }
  }

  return (
    <>
    <div className="">
      <Title className="text-3xl sm:text-3xl lg:text-4xl">Réservations</Title>
      <p className="text-primary text-small md:text-medium">Cherche à travers tous les ressources et trouve celui qui convient le mieux à tes besoins.</p>
      <div className="flex md:block justify-between items-end w-full m-4 md:mb-0 pl-0 ml-0">
        {/* <div>Filters: agency: {agency} validity: {validity} service_type: {service_type}</div> */}
        <SelectFilter placement="outside" items={allFilters} />
        <div className="flex items-center gap-x-4 md:w-full md:justify-end md:mt-4">
          <Button onClick={() => {toggledisplaymode(false)}}
            disableRipple isIconOnly radius="md"
            className={`data-[hover=true]:bg-default ${!calendarDisplay ? "text-white bg-primary" : "text-primary bg-transparent"}`}
            aria-label="vue de carte"
          >
            <ViewColumnsIcon className="w-6" />
          </Button>
          
          <Button onClick={() => {toggledisplaymode(true)}}
            disableRipple isIconOnly radius="md"
            className={`data-[hover=true]:bg-default ${calendarDisplay ? "text-white bg-primary" : "text-primary bg-transparent"}`}
            title="vue calendaire"
          >
            <CalendarIcon className="w-6" />
          </Button>
        </div>
      </div>
      <div>
        <DisplayElement calendarDisplay={calendarDisplay} period={period} activePeriod={activePeriod} />
      </div>
    </div>
    </>
  );
}
