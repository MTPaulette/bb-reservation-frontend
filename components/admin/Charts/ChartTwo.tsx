"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import Title from "@/components/Title";
import { ChartType } from "@/lib/definitions";
import { useTranslations } from 'next-intl';
import { startAndEndOfWeek } from "@/lib/utils";
import moment from "moment";

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

export default function ChartTwo({series, period}: {series: ChartType, period: string}) {
  const t_statistic = useTranslations("Statistic");
  const now = moment();
  const startAndEndOfWeek_values = startAndEndOfWeek(period != "" ? period : now);

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4">
        <Title className="text-xl">{t_statistic("payment_revenue")}</Title>
        <p className="text-foreground/60 font-medium mt-2 leading-none">
          {t_statistic("payment_revenue_description")}
        </p>
        <p className="text-foreground/60 font-medium mt-1 leading-none">
          {t_statistic("week_of")}:
          <span className="font-medium text-sm text-foreground ml-2">
            {startAndEndOfWeek_values.startOfWeek} - {startAndEndOfWeek_values.endOfWeek}
          </span>
        </p>
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
