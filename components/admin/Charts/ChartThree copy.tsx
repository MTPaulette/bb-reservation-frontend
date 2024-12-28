import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Title from "@/components/Title";
import { ChevronDownIcon } from "@/components/Icons";
import { ChartType } from "@/lib/definitions";

const options: ApexOptions = (labels: string[]) => {
  return {
  // const options: ApexOptions = {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#138591", "#262262", "#227bc0", "#5732eb", "#31eeee", "#878787"],
  // labels: ["Desktop", "Tablet", "Mobile", "Unknown"],
  labels: labels,
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
  }
};

// const ChartThree: React.FC = () => {
export default function ChartThree({data}: {data: any}) {
  const series = [65, 34, 12, 56];

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <Title className="text-xl">Visitors Analytics</Title>
        </div>
        {/* {JSON.stringify(data)} */}
        <div>
          <div className="relative z-20 inline-block">
            <select
              name=""
              id=""
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                Monthly
              </option>
              <option value="" className="dark:bg-boxdark">
                Yearly
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <ChevronDownIcon fill="currentColor" size={10} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-y-12 w-full justify-between items-center">
          {data.map((item: ChartType, index: number) => (
            <>
            <Title className="text-lg my-2">{item.name}</Title>
            <div key={index} className="mb-2">
              <div id="chartThree" className="mx-auto flex justify-center">
                <ReactApexChart
                  options={options(item.label)}
                  series={item.data}
                  type="donut"
                />
              </div>
            </div>
            </>
          ))}


      </div>
    </div>
  );
};

// export default ChartThree;
