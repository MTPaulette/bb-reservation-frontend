import React, { ReactNode } from "react";
import Title from "@/components/Title";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/Icons";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-sm border border-divider bg-background px-7.5 py-6 max-w-full shadow-default">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <Title className="text-2xl font-bold truncate">{total}</Title>
          <span className="text-sm font-medium">{title}</span>
        </div>

        {/* <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <span className="fill-meta-3">
              <ArrowUpIcon fill="currentColor" size={16} />
            </span>
          )}
          {levelDown && (
            <span className="fill-meta-5">
              <ArrowDownIcon fill="currentColor" size={16} />
            </span>
          )}
        </span> */}
      </div>
    </div>
  );
};

export default CardDataStats;

    {/*
    <div className="rounded-sm border border-divider bg-background px-3.5 py-2 sm:px-5.5 sm:py-4 shadow-default">
      <div className=" flex items-end justify-between">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          {children}
        </div>
        <span
        className={`flex items-center gap-1 text-sm font-medium ${
          levelUp && "text-meta-3"
        } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <span className="fill-meta-3">
              <ArrowUpIcon fill="currentColor" size={16} />
            </span>
          )}
          {levelDown && (
            <span className="fill-meta-5">
              <ArrowDownIcon fill="currentColor" size={16} />
            </span>
          )}
        </span>
      </div>

      <div className="mt-4 flex flex-col w-full items-start justify-start">
        <Title className="text-lg sm:text-2xl font-bold">{total}</Title>
        <p className="text-sm font-medium">{title}</p>
      </div>
    </div>
    */}