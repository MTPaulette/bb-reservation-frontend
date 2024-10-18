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

  const [period, setPeriod] = React.useState<string>("day");
  function togglePeriod (periodValue: string) {
    setPeriod(periodValue);
    setPeriod(periodValue);
    changePeriod(periodValue);
    pressToday(periodValue);

  };

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

  function pressToday(period: String) {
    // alert("period: "+period)
    setCurrentDate(formatDateLocalTimeZone(thisday));
    if(period == "day") {
      setActivePeriod(thisday.toString());
      onChange(thisday.toString());
    }
    if(period == "week") {
      let startWeek = startOfWeek(thisday, "fr-FR");
      let endWeek = endOfWeek(thisday, "fr-FR");
      setActivePeriod(`Du ${startWeek} - Au ${endWeek}`);
      onChange(`${startWeek}_${endWeek}`);
    }
    if(period == "month") {
      setActivePeriod(`${monthTag[month]} ${year}`);
      onChange(`${monthTag[month]}_${year}`);
    }
  }

  function pressPrevNext(value: string) {
    setCurrentDate(formatDateLocalTimeZone(thisday));
    let today_calendar_date = new CalendarDate(year, month+1, dayOfMonth);
    if(period == "day") {
      let day_prev_next = value == "prev" ? today_calendar_date.subtract({days: 1}) : today_calendar_date.add({days: 1});
      setCurrentDate(formatDateLocalTimeZone(day_prev_next));
      setActivePeriod(day_prev_next.toString());
      onChange(day_prev_next.toString());
    }
    if(period == "week") {
      let week_prev_next = value == "prev" ? today_calendar_date.subtract({weeks: 1}) : today_calendar_date.add({weeks: 1});
      let startWeek = startOfWeek(week_prev_next, "fr-FR");
      let endWeek = endOfWeek(week_prev_next, "fr-FR");
      setActivePeriod(`Du ${startWeek} - Au ${endWeek}`);
      setCurrentDate(formatDateLocalTimeZone(startWeek));
      onChange(`${startWeek}_${endWeek}`);
    }
    if(period == "month") {
      // let month_prev = today_calendar_date.subtract({months: 1});
      let month_prev_next = value == "prev" ? today_calendar_date.subtract({months: 1}) : today_calendar_date.add({months: 1});
      let month_index = formatDateLocalTimeZone(month_prev_next).getMonth();
      let startMonth = startOfMonth(month_prev_next);
      setActivePeriod(`${monthTag[month_index]} ${formatDateLocalTimeZone(startMonth).getFullYear()}`);
      setCurrentDate(formatDateLocalTimeZone(startMonth));

      onChange(`${monthTag[month_index]}_${formatDateLocalTimeZone(startMonth).getFullYear()}`);
    }
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
          onClick={() => pressToday(period)}
          radius="md" variant="light" size="md"
          className="p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent"
          title="reservation d'aujourd'hui"
        >
          Aujourd'hui
        </Button>
        <div className="flex gap-x-1">
          <Button
            onClick={() => pressPrevNext("prev")}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
            aria-label="vue de carte"
          >
            <ChevronLeftIcon className="w-5" />
          </Button>
          <Button
            onClick={() => pressPrevNext("next")}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
            aria-label="vue de carte"
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