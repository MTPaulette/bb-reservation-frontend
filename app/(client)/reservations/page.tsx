"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { CalendarIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";

import Title from "@/app/components/Title";
import SelectFilter from "@/app/components/SelectFilter";
import Calendar from "@/app/components/Calendar";
import FindRessource from "@/app/components/FindRessource";
import RessourceCard from "@/app/components/card/Ressource";

import { _agencies, _service_types, _validities } from '@/app/lib/data';

export default function Reservations({
  searchParams,
}: {
  searchParams?: {
    agency?: string;
    validity?: string;
    service_type?: string;
  };
}) {
  
  // const agency = searchParams?.agency || '';
  // const validity = searchParams?.validity || '';
  // const service_type = searchParams?.service_type || '';

  const allFilters = [
    { label: "Agence", queryName: "agency", placeholder: "Selectionner une agence", items: _agencies },
    { label: "Validité", queryName: "validity", placeholder: "Selectionner une validité", items: _validities },
    { label: "Type de service", queryName: "service_type", placeholder: "Selectionner un type", items: _service_types },
  ];

  const [calendarDisplay, setCalendarDisplay] = React.useState<boolean>(true);
  const toggledisplaymode = (mode: boolean) => {
    setCalendarDisplay(mode);
  };

  function DisplayElement({
    calendarDisplay,
  } : { 
    calendarDisplay: boolean,
  }) {
    if(calendarDisplay){
      return (
        <div>
          <Calendar />
        </div>
      )
    } else {
      return (
        <div> 
          <FindRessource />
          {/* <div className="bg-background rounded-small p-4 md:p-5"> */}
          <div className="my-8 w-full flex flex-wrap justify-center sm:justify-around items-center gap-6">
            <RessourceCard />
            <RessourceCard />
            <RessourceCard />
            <RessourceCard />
            <RessourceCard />
            <RessourceCard />
          </div>
        </div>
      )
    }
  }

  return (
    <>
    <div className="">
      <Title className="text-3xl sm:text-3xl lg:text-4xl">Réservations</Title>
      <p className="text-foreground/50 text-small md:text-medium">Cherche à travers tous les ressources et trouve celui qui convient le mieux à tes besoins.</p>
      <div className="flex md:block justify-between items-end w-full m-4 md:mb-0 pl-0 ml-0">
        {/* <div>Filters: agency: {agency} validity: {validity} service_type: {service_type}</div> */}
        <div className="text-foreground/90">
          <SelectFilter placement="outside" items={allFilters} />
        </div>
        <div className="flex items-center gap-x-4 md:w-full md:justify-end md:mt-4">
          <Button onClick={() => {toggledisplaymode(false)}}
            disableRipple isIconOnly radius="md"
            className={`data-[hover=true]:bg-default ${!calendarDisplay ? "text-white bg-primary" : "text-foreground/50 bg-transparent"}`}
            aria-label="vue de carte"
          >
            <ViewColumnsIcon className="w-6" />
          </Button>
          
          <Button onClick={() => {toggledisplaymode(true)}}
            disableRipple isIconOnly radius="md"
            className={`data-[hover=true]:bg-default ${calendarDisplay ? "text-white bg-primary" : "text-foreground/50 bg-transparent"}`}
            title="vue calendaire"
          >
            <CalendarIcon className="w-6" />
          </Button>
        </div>
      </div>
      <div>
        <DisplayElement calendarDisplay={calendarDisplay} />
      </div>
    </div>
    </>
  );
}
