"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { ChartType } from "@/lib/definitions";
import { useTranslations } from 'next-intl';
import { startAndEndOfWeek } from "@/lib/utils";
import moment from "moment";
import Title from "@/components/Title";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "right",
  },
  colors: ["#3C50E0", "#80CAEE", "#6577F3", "#8FD0EF", "#0FADCF", "#138591", "#262262", "#227bc0", "#5732eb", "#31eeee", "#878787"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335, //335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 400, //300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 400,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#80CAEE"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 50000,
  },
};


export default function ChartOne({series, period}: {series: ChartType, period: string}) {
  const t_statistic = useTranslations("Statistic");
  const year = period != "" ? moment(period).year() : moment().year();

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-8">
      <div className="mb-4">
        <Title className="text-xl">{t_statistic("payment_per_month")}</Title>
        <p className="text-foreground/60 font-medium mt-2 leading-none">
          {t_statistic("payment_per_month_description")}
        </p>
        <p className="text-foreground/60 font-medium mt-1 leading-none">
          {t_statistic("year")}:
          <span className="font-medium text-sm text-foreground ml-2">{year}</span>
        </p>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={400}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

// export default ChartOne;
