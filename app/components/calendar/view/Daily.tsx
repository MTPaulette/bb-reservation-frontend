'use client';

import { today, getLocalTimeZone } from "@internationalized/date";

export default function Daily({
  activePeriod
}: {
  activePeriod: string
}) {

  const thisday = today(getLocalTimeZone()).toString();
  return (
    <div>
      <h1 className="bg-yellow-200 p-4">today: {thisday} <br />  vue journaliere {activePeriod} </h1>
    </div>
  );
};