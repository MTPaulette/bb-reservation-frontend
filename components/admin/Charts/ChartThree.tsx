import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Title from "@/components/Title";
import { ChevronDownIcon } from "@/components/Icons";
import { useTranslations } from 'next-intl';
import moment from "moment";

const options: ApexOptions = (labels: string[]) => {
  return {
  chart: {
    fontFamily: "Satoshi, sans-serif",
    type: "donut",
  },
  colors: ["#3C50E0", "#6577F3", "#8FD0EF", "#0FADCF", "#138591", "#262262", "#227bc0", "#5732eb", "#31eeee", "#878787"],
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

type DataType = {
  name:  string;
  label: string[];
  data:  number[];
}

export default function ChartThree({data, period}: { data: DataType[], period: string }) {
  const [selectedAgency, setSelectedAgency] = useState<number>(0);
  const t_statistic = useTranslations("Statistic");
    const year = period != "" ? moment(period).year() : moment().year();

  return (
    <div className="col-span-12 rounded-sm border border-divider bg-background px-5 pb-5 pt-7.5 shadow-default sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-x-4 sm:flex lg:block">
        <div className="mb-6">
          <Title className="text-xl">{t_statistic("ressource_with_reservations")}</Title>
          <p className="text-foreground/60 font-medium mt-2 leading-none">
            {t_statistic("ressource_with_reservations_description")}
          </p>
          <p className="text-foreground/60 font-medium mt-1 leading-none">
            {t_statistic("year")}:
            <span className="font-medium text-sm text-foreground ml-2">{year}</span>
          </p>
        </div>
        <div className="flex gap-x-2">
          <div>
            <div className="relative z-20 inline-block">
              <select
                onChange={(e) => {
                  setSelectedAgency(Number(e.target.value));
                }}
                name=""
                id=""
                className="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
              >
                {data.map((item: DataType, index: number) => (
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