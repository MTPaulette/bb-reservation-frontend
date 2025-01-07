"use client";

import React, { useEffect, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import { CalendarIcon, ViewColumnsIcon } from "@/components/Icons";

import Title from "@/components/Title";
import FindRessource from "@/components/FindRessource";
// import Pagination from "@/components/Pagination";
import { CommonSkeleton } from '@/components/Skeletons';
import { _agencies, _service_types, _validities } from "@/lib/data";
import { useLocale, useTranslations } from "next-intl";
import { getCalendar, getRessources } from "@/lib/action/default";
import { EventType, RessourceDefaultType } from "@/lib/definitions";
import RessourceCard from "./RessourceCard";
import SelectFilter from "./SelectFilter";
import Calendar from "./Calendar";
import RessourcesWrapper from "./RessourcesWrapper";
import Alert from "../Alert";

export default function Reservations() {
  const [ressources, setRessources] = useState<RessourceDefaultType[]>([]);
  const [events, setEvents] = useState<EventType[]>([]);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");

  useEffect(() => {
    setError("");
    getRessources()
      .then(async (res) => {
        if(res?.ok){
          setRessources(await res.json());
        }else {
          setError(t_error("something_wrong"));
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
    getCalendar()
      .then(async (res) => {
        if(res?.ok){
          setEvents(await res.json());
        }else {
          setError(t_error("something_wrong"));
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);

  const colors: string[] = ["#10b94e", "#ffa81d", "#F0950C", "#6577F3", "#0FADCF", "#138591", "#262262", "#227bc0", "#5732eb", "#31eeee", "#878787"];

  const agencies: string[] = Array.from(new Set(ressources.map((ressource) => ressource.agency)));

  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(ressources.length / rowsPerPage);

  const getColor = (agency: string) => {
    let index = agencies.indexOf(agency);
    if(index == -1) {
      index = 0;
    }
    return colors[index];
  }

  const filteredItems = React.useMemo(() => {
    const filteredRessources = [...ressources];

    return filteredRessources;
  }, [ressources]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const allFilters = [
    { label: "Agence", queryName: "agency", placeholder: "Selectionner une agence", items: _agencies },
    { label: "Validité", queryName: "validity", placeholder: "Selectionner une validité", items: _validities },
    { label: "Type de service", queryName: "service_type", placeholder: "Selectionner un type", items: _service_types },
  ];

  const [calendarDisplay, setCalendarDisplay] = React.useState<boolean>(false);
  const toggledisplaymode = (mode: boolean) => {
    setCalendarDisplay(mode);
  };

  return (
    <>
    <div className="">
      <Title className="text-3xl sm:text-3xl lg:text-4xl mb-1.5">Réservations</Title>
      <p className="text-foreground/80 font-light">
        Cherche à travers tous les ressources et trouve celui qui convient le mieux à tes besoins.
      </p>
      <div className="flex md:block justify-between items-end w-full m-6 md:my-12 pl-0 ml-0">
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
            <ViewColumnsIcon fill="currentColor" size={24} />
          </Button>
          
          <Button onClick={() => {toggledisplaymode(true)}}
            disableRipple isIconOnly radius="md"
            className={`data-[hover=true]:bg-default ${calendarDisplay ? "text-white bg-primary" : "text-foreground/50 bg-transparent"}`}
            title="vue calendaire"
          >
            <CalendarIcon fill="currentColor" size={22} />
          </Button>
        </div>
      </div>
      <div>
      <div className="w-full">
        {error != "" ? (
          <Alert color="danger" message={error} />
        ) : (
        <>
        {calendarDisplay ?
          <Calendar events={events} />
          : (
          <>
            <FindRessource />
            <div className="my-8 w-full flex flex-wrap justify-center sm:justify-around items-center gap-6">
              {ressources.length == 0 || events.length == 0 ? (
                <CommonSkeleton />
              ):(
                <div className="w-full flex flex-wrap justify-center sm:justify-around items-center gap-6">
                  {items.map((ressource, index) => (
                    <div key={index}>
                      <RessourceCard ressource={ressource} color={getColor(ressource.agency)} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="py-2 px-2 flex justify-between items-center z-1"> */}
            <div className="block sm:flex justify-between items-center mb-12">
              <div className="flex w-fulll justify-center sm:justify-between items-center z-1">
                <Pagination
                  showControls
                  classNames={{
                    cursor: "bg-primary text-background",
                  }}
                  color="primary"
                  page={page}
                  total={pages}
                  variant="light"
                  onChange={setPage}
                />
              </div>
              <div className="flex justify-between items-center gap-x-4">
                <span className="text-default-400 text-small">
                  {`${t_table("total")}`}: <span className="font-semibold">{ressources.length}</span>
                </span>
                <label className="flex items-center text-default-400 text-small">
                  {t_table("row_per_page")}
                  <select
                    className="bg-transparent outline-none text-default-400 text-small"
                    onChange={onRowsPerPageChange}
                    defaultValue={4}
                  >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="12">12</option>
                    <option value="15">15</option>
                  </select>
                </label>
              </div>
            </div>
              {/* <Pagination totalPages={8} /> */}
            {/* <RessourcesWrapper /> */}
          </>
        )}
        </>
        )}
      </div>
      </div>
    </div>
    </>
  );
}