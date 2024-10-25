import { CalendarIcon } from "@heroicons/react/24/outline";
import BarChart, { DoughnutChart } from "@/app/components/chart/BarChart";
import Title from "@/app/components/Title";

export default function Charts() {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <Title className="mb-4 text-base">Recent Revenue</Title>
      <div className="rounded-xl bg-default/50 p-4">
        <div className="mt-0 rounded-md bg-background p-4 md:gap-4 h-[350px] md:h-[250px] pb-10 md:pb-8">
          <BarChart />
        </div>
        <div className="mt-4 rounded-md bg-background p-4 md:gap-4 h-[350px] md:h-[250px]">
          <DoughnutChart />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-foreground" />
          <h3 className="ml-2 text-sm text-foreground">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
