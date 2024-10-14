"use client";

import React from "react";
import { Time, today, getLocalTimeZone } from "@internationalized/date";

import { Button, TimeInput, DatePicker } from "@nextui-org/react";
import { CalendarIcon, ViewColumnsIcon, CalendarDateRangeIcon, ClockIcon, ArrowRightStartOnRectangleIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Title from "@/app/components/Title"
import SelectFilter from "@/app/components/SelectFilter"
import PeriodFilter from "@/app/components/PeriodFilter"
import Calendar from "@/app/components/Calendar"

import _agencies from '@/app/database/Agencies'
import _validities from "@/app/database/Validities.js"
import _service_types from "@/app/database/Service_types.js"


function DisplayElement({calendarDisplay} : { calendarDisplay: boolean }) {
  if(calendarDisplay){
    return <Calendar />
  } else {
    return <div> card </div>
  }
}

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
  const pressToday = () => {
    alert("today");
  }
  const pressPrev = () => {
    console.log("prev");
  }
  const pressNext = () => {
    console.log("next");
  }
  /* */
  // const setPeriod = ( period: String ) => {
  //   period = period;
  //   console.log('============================== parent period');
  //   console.log(period);
  // }

  return (
    <>
    <div className="">
      <Title>Réservations</Title>
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

      {/* search for ressource */}
      <form className="w-full my-4 p-4 md:p-5 flex flex-wrap gap-y-4 items-center justify-between bg-content3 rounded-lg">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-5 md:gap-x-8">
          <DatePicker
            label="Date" labelPlacement="inside" radius="sm" color="primary"
            className="w-36 sm:w-44 md:w-52 rounded-small"
            showMonthAndYearPickers
            defaultValue={today(getLocalTimeZone())}
            minValue={today(getLocalTimeZone())}
            // onChange={(e) => {
            //   handleSelectionChange(e.target.value, queryName);
            // }}
          />
          <div className="flex flex-wrapp items-center gap-x-2">
            <TimeInput 
              label="Heure de debut" labelPlacement="inside" color="primary"
              hourCycle={24}
              defaultValue={new Time(new Date().getHours(), 0)}
              minValue={new Time(8)}
              maxValue={new Time(21)}
              endContent={<ClockIcon className="w-6" />}
              className="w-32 md:w-36 rounded-small whitespace-nowrap" radius="sm"
            />
            <ArrowRightStartOnRectangleIcon className="w-6 flex-shrink-0 text-primary" />
            <TimeInput 
              label="Heure de fin" labelPlacement="inside" color="primary"
              hourCycle={24}
              minValue={new Time(8)}
              maxValue={new Time(21)}
              defaultValue={new Time(new Date().getHours()+1, 0)}
              className="w-32 md:w-36 rounded-small whitespace-nowrap" radius="sm"
            />
          </div>
        </div>
        <div>
          <Button
            disableRipple radius="md" variant="solid" color="primary"
            startContent={<CalendarDateRangeIcon className="w-6" />}
          >
            Montrer disponibilités
          </Button>
        </div>
      </form>

{period} <br />
      {/* filter for ressource */}
      {/* <PeriodFilter changePeriod={setPeriod} /> */}
      <PeriodFilter 
        changePeriod={(period: string) => setPeriod(period)}
        onPressToday={() => pressToday()} onPressPrev={() => pressPrev()} onPressNext={() => pressNext()}
      />
      <div className="bg-background rounded-small p-4 md:p-5">
        <DisplayElement calendarDisplay={calendarDisplay} />
      </div>
    </div>
    </>
  );
}
