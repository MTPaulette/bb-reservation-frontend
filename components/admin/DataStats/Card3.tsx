import React from "react";
import Title from "@/components/Title";
import { StarIcon } from "@/components/Icons";

interface CardDataStatsProps {
  title: string;
  value: string;
  total: string;
}

const CardDataStats3: React.FC<CardDataStatsProps> = ({
  title,
  value,
  total,
}) => {
  return (
    <div className="p-4.5 min-w-60 max-h-30  rounded-sm border border-divider bg-background shadow-default">
      <div className="flex gap-x-0.5 items-center text-yellow-600">
        <StarIcon fill="currentColor" size={20} />
        <StarIcon fill="currentColor" size={20} />
        <StarIcon fill="currentColor" size={20} />
      </div>
      <div className="mt-3 flex gap-x-2 items-end justify-between">
        <div className="w-full">
          <span className="text-sm font-medium">{title}</span>
          <div className="flex w-full justify-between items-center">
            <Title className="text-xl font-bold truncate whitespace-nowrap">{value}</Title>
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