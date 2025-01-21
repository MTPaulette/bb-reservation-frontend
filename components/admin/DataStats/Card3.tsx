import React from "react";
import Title from "@/components/Title";
import { StarIcon } from "@/components/Icons";

interface CardDataStatsProps {
  title: string;
  subtitle: string;
  value: string;
  total: string;
}

const CardDataStats3: React.FC<CardDataStatsProps> = ({
  title,
  subtitle,
  value,
  total,
}) => {
  return (
    <div className="p-4.5 w-full sm:w-60 lg:w-54.5 xl:w-55 h-38 sm:h-34 rounded-sm border border-divider bg-background shadow-default">
      <div className="flex gap-x-0.5 items-center text-yellow-600">
        <StarIcon fill="currentColor" size={20} />
        <StarIcon fill="currentColor" size={20} />
        <StarIcon fill="currentColor" size={20} />
      </div>
      <div className="mt-3 flex gap-x-2 items-end justify-between">
        <div className="w-full">
          <p className="text-sm font-medium">{title}</p>
          <div className="flex gap-x-2 w-full justify-between items-end mt-1">
            <div className="truncate">
              <Title className="text-xl font-bold truncate whitespace-nowrap">{value}</Title>
              <p className="text-xs text-foreground/60 -mt-1.5">{subtitle}</p>
            </div>
            <div className="flex flex-shrink-0 h-6 w-6 items-center justify-center rounded-full bg-yellow-400 bg-primaryy">
              <span className="text-xs font-medium text-black">
                {" "}
                {total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats3;