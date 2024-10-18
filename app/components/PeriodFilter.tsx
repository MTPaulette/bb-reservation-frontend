'use client';

import React from "react";
import { today, getLocalTimeZone, startOfWeek, endOfWeek, CalendarDate, startOfMonth } from "@internationalized/date";

import { Button } from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import Title from "@/app/components/Title"

export default function Calendar({
  changePeriod, onChange
}: {
  changePeriod: any, onChange: any
}) {


  const thisday = today(getLocalTimeZone());
  const [activePeriod, setActivePeriod] = React.useState<React.ReactNode>(thisday.toString());
  const [currentDate, setCurrentDate] = React.useState<Date>(formatDateLocalTimeZone(thisday));

  const monthTag =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();
  let dayOfMonth = currentDate.getDate();

  function formatDateLocalTimeZone(date: CalendarDate) {
    return date.toDate(getLocalTimeZone())
  }


  const [period, setPeriod] = React.useState<string>("day");

  function pressTodayPrevNext(value: string) {
    onChange(value);
  }

  function togglePeriod(periodValue: string) {
    setPeriod(periodValue);
    changePeriod(periodValue);
  }

  return (
    <>
    <div className="w-full flex flex-wrap items-end justify-between my-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() => {togglePeriod("month")}}
          size="md" radius="md" color="primary" variant={`${period == "month" ? "solid" : "ghost"}`}
        >
          Mois
        </Button>
        <Button
          onClick={() => {togglePeriod("week")}}
          size="md" radius="md" color="primary" variant={`${period == "week" ? "solid" : "ghost"}`}
        >
          Semaine
        </Button>
        <Button
          onClick={() => {togglePeriod("day")}}
          size="md" radius="md" color="primary" variant={`${period == "day" ? "solid" : "ghost"}`}
        >
          Jour
        </Button>
      </div>
      <Title className="hidden sm:block text-2xl">{activePeriod} - currentDate {currentDate.toLocaleDateString()}</Title>
      <div className="flex flex-col justify-center items-center">
        <Button
          onClick={() => pressTodayPrevNext("today")}
          radius="md" variant="light" size="md"
          className="p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent"
        >
          Aujourd'hui
        </Button>
        <div className="flex gap-x-1">
          <Button
            onClick={() => pressTodayPrevNext("prev")}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
          >
            <ChevronLeftIcon className="w-5" />
          </Button>
          <Button
            onClick={() => pressTodayPrevNext("next")}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
          >
            <ChevronRightIcon className="w-5" />
          </Button>
        </div>
      </div>
    </div>
    <Title className="block sm:hidden w-full text-center mt-5 mb-3 text-xl">{activePeriod} - currentDate {currentDate.toString()}</Title>
    </>
  );
};