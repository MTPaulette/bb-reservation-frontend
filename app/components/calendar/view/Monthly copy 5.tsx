'use client';

import React from "react";
import { today, getLocalTimeZone, CalendarDate, getWeeksInMonth } from "@internationalized/date";
import { Divider } from "@nextui-org/react";

export default function Monthly({
  activePeriod
}: {
  activePeriod: string
}) {

  function formatDateLocalTimeZone(date: CalendarDate) {
    return date.toDate(getLocalTimeZone())
  }

  const thisday = today(getLocalTimeZone()).toString();
  const monthTag =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
  const dayTag = ["Dim","Lun","Mar","Mer","Jeu","Ven", "Sam"];

  const currentMonth = activePeriod?.toString().split("_")[0];
  const currentYear = activePeriod?.toString().split("_")[1];

  let date = new CalendarDate(Number(currentYear), monthTag.indexOf(currentMonth)+1, 1);
  let weeks_in_month = getWeeksInMonth(date, 'fr-FR');
  let first_day_of_week = formatDateLocalTimeZone(date).getDay();
  
  function getNextDay(date: CalendarDate) {
    console.log(date)
    return date.add({days: 1})
  }
  
  let cells: React.ReactNode[] = []
  let cellDate = date;
  let i=1;
  for (let index = 0; index < weeks_in_month; index++) {
    cells.push(
        <div>{i}</div>
        // <div>{cellDate.toString()}</div>
    ),
      // cellDate = getNextDay(cellDate)
      i = i+1
    // {dayTag.map((column, index) =>
    // )}
  }

  return (
    <div className="w-full overflow-scroll over-y over-x">
      <div className="bg-green-200 p-4">
        today: {thisday} <br /> vue mensuelle {activePeriod} <br />
        currentMonth: {currentMonth} <br /> currentYear {currentYear} <br /><br />
        date: {date.toString()} <br/> weeks_in_month: {weeks_in_month} <br/>
        first_day_of_week: {first_day_of_week}
      </div>

      <div className="min-w-[500px] mt-7 border border-yellow-600">
        <div className="my-2 w-full flex justify-between bg-transparent font-semibold text-small text-foreground">
          {dayTag.map((column, index) =>
            <div className="bg-red-100" key={index}>{column}</div>
          )}
        </div>
        <Divider className="my-3"></Divider>
        <div>
          {dayTag.map((value, index) =>
            <div key={index} className="w-full flex justify-between">
              {cells.map((value, index) => 
                value
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};