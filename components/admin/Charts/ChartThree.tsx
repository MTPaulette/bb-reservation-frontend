import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Title from "@/components/Title";
import { ChevronDownIcon } from "@/components/Icons";
import { ChartType } from "@/lib/definitions";
import { useTranslations } from 'next-intl';

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

export default function ChartThree({data}: {data: any}) {
  const [selectedAgency, setSelectedAgency] = React.useState<number|string>(0);
  const t_statistic = useTranslations("Statistic");

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-x-4 sm:flex lg:block">
        <div>
          <Title className="mb-1.5 text-xl">{t_statistic("ressource_with_reservations")}</Title>
          <p className="text-foreground/60 font-med font-medium mb-6">{t_statistic("ressource_with_reservations_description")}</p>
        </div>
        <div className="flex gap-x-2">
          {/* {selectedAgency} */}
          <div>
            <div className="relative z-20 inline-block">
              <select
                onChange={(e) => {
                  setSelectedAgency(e.target.value);
                }}
                name=""
                id=""
                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              >
                {data.map((item: ChartType, index: number) => (
                  <option key={index} value={index} className="dark:bg-boxdark">
                    {item.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
                <ChevronDownIcon fill="currentColor" size={10} />
              </span>
            </div>
          </div>
          {/* <div>
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
          </div> */}
          <div>
          </div>
        </div>
      </div>

      <div className="">
        <Title className="text-lg my-2 text-center">{data[selectedAgency].name}</Title>
        <div className="mb-2">
          <div id="chartThree" className="mx-auto flex justify-center">
            <ReactApexChart
              options={options(data[selectedAgency].label)}
              series={data[selectedAgency].data}
              type="donut"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ChartThree;
