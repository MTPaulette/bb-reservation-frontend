'use client';

import { today, getLocalTimeZone } from "@internationalized/date";

export default function Weekly({
  activePeriod
}: {
  activePeriod: string
}) {

  const currentStartOfWeek = activePeriod?.toString().split("_")[0];
  const currentEndOfWeek = activePeriod?.toString().split("_")[1];

  const thisday = today(getLocalTimeZone()).toString();
  return (
    <div>
      <h1 className="bg-red-200 p-4">today: {thisday} <br />  vue hebdomadaire {activePeriod} <br/> 
        currentStartOfWeek: {currentStartOfWeek} <br /> currentEndOfWeek: {currentEndOfWeek}
      </h1>
    </div>
  );
};