'use client';

import React from "react";
import { Time, today, getLocalTimeZone } from "@internationalized/date";

import { Button, TimeInput, DatePicker } from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Calendar({
  changePeriod, onPressToday, onPressPrev, onPressNext
}: {
  changePeriod: any, onPressToday: any, onPressPrev: any, onPressNext: any
}) {
  const [period, setPeriod] = React.useState<string>("day");
  function togglePeriod (periodValue: string) {
    setPeriod(periodValue);
    changePeriod(periodValue)
    // console.log(period);
  };



  return (
    <div className="w-full flex flex-wrap items-end justify-between my-5">
      <div className="flex flex-wrap items-center gap-x-3">
        {period}
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
      <div className="flex flex-col justify-center items-center">
        <Button
          onClick={onPressToday}
          radius="md" variant="light" size="md"
          className="p-0 text-foreground bg-transparent data-[hover=true]:bg-transparent"
          title="reservation d'aujourd'hui"
        >
          Aujourd'hui
        </Button>
        <div className="flex gap-x-1">
          <Button 
            onClick={onPressPrev}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
            aria-label="vue de carte"
          >
            <ChevronLeftIcon className="w-5" />
          </Button>
          <Button 
            onClick={onPressNext}
            isIconOnly radius="md" size="sm"
            className="data-[hover=true]:text-white data-[hover=true]:bg-primary"
            aria-label="vue de carte"
          >
            <ChevronRightIcon className="w-5" />
          </Button>
        </div>

      </div>
    </div>
  );
};