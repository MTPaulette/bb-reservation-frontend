'use client';


import Monthly from "@/app/components/calendar/view/Monthly";
import Weekly from "@/app/components/calendar/view/Weekly";
import Daily from "@/app/components/calendar/view/Daily";


export default function Calendar({
  period, activePeriod
}: {
  period: string, activePeriod: string
}) {

  let currentMonth: string|undefined = '';
  let currentDate: string|undefined = '';
  let currentStartOfWeek: string|undefined = '';
  let currentEndOfWeek: string|undefined = '';

  if(period == "month") {
    currentMonth = activePeriod?.toString();
  }
  if(period == "day") {
    currentDate = activePeriod?.toString();
  }
  if(period == "week") {
    currentStartOfWeek = activePeriod?.toString().split("_")[0];
    currentEndOfWeek = activePeriod?.toString().split("_")[1];
  }

  function DisplayView({
    period, activePeriod
  }: {
    period: string, activePeriod: string
  }) {
    if(period === "day"){
      return <Daily activePeriod={activePeriod} />
    }
    if(period === "week"){
      return <Weekly activePeriod={activePeriod} />
    }
    if(period === "month"){
      return <Monthly activePeriod={activePeriod} />
    }
  }


  return (
    <div>
      <DisplayView period={period} activePeriod={activePeriod} />

      <h1 className="mt-10"> vue calendaire {period} {activePeriod} </h1>
      <div className="p-4 my-7 border border-green-500">
        currentMonth: {currentMonth} <br/> currentDate: {currentDate} <br/> 
        currentStartOfWeek: {currentStartOfWeek} <br /> currentEndOfWeek: {currentEndOfWeek}
      </div>
    </div>
  );
};