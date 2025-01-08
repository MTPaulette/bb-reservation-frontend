"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import Title from "@/components/Title";
import { ChevronDownIcon } from "@/components/Icons";
import { ChartType } from "@/lib/definitions";
import { useTranslations } from 'next-intl';

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#80CAEE", "#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#138591", "#262262", "#227bc0", "#5732eb", "#31eeee", "#878787"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 400, //335,
    stacked: false, //true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};

// const ChartTwo: React.FC = () => {
export default function ChartTwo({series}: {series: ChartType}) {
  const t_statistic = useTranslations("Statistic");
  /*
  const series = [
    {
      name: "Sales",
      data: [44, 55, 41, 67, 22, 43, 65],
    },
    {
      name: "Revenue",
      data: [13, 23, 20, 8, 13, 27, 15],
    },
  ];
  */

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <Title className="text-xl">{t_statistic("payment_revenue")}</Title>
        </div>
        {/* <div>
          <div className="relative z-20 inline-block">
            <select
              name="#"
              id="#"
              className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="dark:bg-boxdark">
                This Week
              </option>
              <option value="" className="dark:bg-boxdark">
                Last Week
              </option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <ChevronDownIcon fill="currentColor" size={10} />
            </span>
          </div>
        </div> */}
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={400}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

// export default ChartTwo;
