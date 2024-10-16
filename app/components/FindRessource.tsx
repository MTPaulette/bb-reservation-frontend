"use client";

import React from "react";
import { Time, today, getLocalTimeZone } from "@internationalized/date";

import { Button, TimeInput, DatePicker } from "@nextui-org/react";
import { CalendarDateRangeIcon, ClockIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function FindRessource() {

  const thisday = today(getLocalTimeZone());
  const thishour = new Date().getHours();

  return (
    <>
    {/* search for ressource */}
    <form className="w-full my-4 p-4 md:p-5 flex flex-wrap gap-y-4 items-start justify-between bg-content3 rounded-lg">
      <div className="flex flex-wrap items-start gap-x-4 gap-y-5 md:gap-x-8">
        <DatePicker
          label="Date" labelPlacement="inside" radius="sm" color="primary"
          className="w-full sm:w-44 md:w-52 rounded-small"
          showMonthAndYearPickers
          defaultValue={thisday}
          minValue={thisday}
          // onChange={(e) => {
          //   handleSelectionChange(e.target.value, queryName);
          // }}
        />
        <div className="flex flex-wrapp items-start gap-x-2">
          <TimeInput 
            label="Heure de debut" labelPlacement="inside" color="primary"
            hourCycle={24}
            defaultValue={new Time(thishour, 0)}
            minValue={new Time(8)}
            maxValue={new Time(21)}
            endContent={<ClockIcon className="w-6" />}
            className="w-32 md:w-36 rounded-small" radius="sm"
          />
          <ArrowRightStartOnRectangleIcon className="w-6 mt-4 flex-shrink-0 text-primary" />
          <TimeInput 
            label="Heure de fin" labelPlacement="inside" color="primary"
            hourCycle={24}
            minValue={new Time(8)}
            maxValue={new Time(21)}
            defaultValue={new Time(thishour+1, 0)}
            className="w-32 md:w-36 rounded-small" radius="sm"
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
    </>
  );
}