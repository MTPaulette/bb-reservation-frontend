'use client';

import React from "react";
import { today, getLocalTimeZone, CalendarDate, getWeeksInMonth, startOfMonth } from "@internationalized/date";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    name: "Tony Reichert",
    role: "CEO",
    status: "Active",
  },
  {
    key: "2",
    name: "Zoey Lang",
    role: "Technical Lead",
    status: "Paused",
  },
  {
    key: "3",
    name: "Jane Fisher",
    role: "Senior Developer",
    status: "Active",
  },
  {
    key: "4",
    name: "William Howard",
    role: "Community Manager",
    status: "Vacation",
  },
];

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "role",
    label: "ROLE",
  },
  {
    key: "status",
    label: "STATUS",
  },
];

export default function Monthly({
  activePeriod
}: {
  activePeriod: string
}) {

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));

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
    return date.add({days: 1})
  }

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  let cellValues = [];
  let cellDate = date;

  /*
  for (let index = 0; index < weeks_in_month; index++) {
    cellValues.push(
      <TableRow key={index}>
        {(columnKey) => <TableCell>i: {index} - Key: {columnKey}</TableCell>}
        </TableRow>
      )
      cellDate = getNextDay(cellDate);
    }
    */

  for (let index = 0; index < weeks_in_month; index++) {
    cellValues.push(
      <TableRow key={index}>
        {(columnKey) => <TableCell>{cellDate.toString()}  i: {index}</TableCell>}
      </TableRow>
    )
    // cellDate = getNextDay(cellDate);
  }

  return (
    <div>
      <div className="bg-green-200 p-4">
        today: {thisday} <br /> vue mensuelle {activePeriod} <br />
        currentMonth: {currentMonth} <br /> currentYear {currentYear} <br /><br />
        date: {date.toString()} <br/> weeks_in_month: {weeks_in_month} <br/>
        first_day_of_week: {first_day_of_week}
      </div>

      <div className="mt-7">
        <Table
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          classNames={classNames}
        >
          <TableHeader>
            {dayTag.map((column, index) =>
              <TableColumn key={index}>{column}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {cellValues.map((row) =>
              row
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-7">
        <Table removeWrapper aria-label="Example table with dynamic content">
          <TableHeader>
            {columns.map((column) =>
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {rows.map((row) =>
              <TableRow key={row.key}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

/*

          <TableBody>
            {weeks_in_month.map((row) =>
              <TableRow key={row.key}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
          */