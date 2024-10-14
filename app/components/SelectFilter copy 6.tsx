"use client";

import {Select, SelectItem, Button} from "@nextui-org/react";
import React from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SelectFilter({
  placement, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  items: { label: string; placeholder: string; queryName: string, items: string[]; }[],
}) {
  
  const [showFilter, setShowFilter] = React.useState<boolean>(false);
  const toogledisplayfilter = (mode: boolean) => {
    setShowFilter(mode);
    console.log(showFilter)
  };
  
  return (
    <>
    <div>
      <div className="inline sm:hidden">
      showFilter: {showFilter}
        <div className={`${showFilter ? "hidden" : "block"}`}>
          <Button onClick={() => {toogledisplayfilter(true)}}
            size="sm" color="default" variant="bordered" 
            startContent={<PlusIcon className="w-4 h-4" />}
            className="font-medium text-foreground data-[hover=true]:bg-default"
          >
            Filtres
          </Button>
        </div>
        <div className={`${showFilter ? "block" : "hidden"}`}>
          <Button onClick={() => {toogledisplayfilter(false)}}
            size="sm" color="default" variant="bordered" 
            startContent={<XMarkIcon className="w-4 h-4" />}
            className="font-medium text-foreground data-[hover=true]:bg-default"
          >
            Masquer les filtres
          </Button>
        </div>
      </div>
    <div className="flex w-full flex-wrap items-end gap-y-4 gap-x-4 md:gap-x-6 bg-red-400">
      {items.map((filter, index) => (
        <Filter
          items={filter.items} key={index}
          placement={placement} label={filter.label} placeholder={filter.placeholder}
          queryName={filter.queryName}
        />
      ))}
    </div>
    </div>
  </>
  );
}

export function Filter({
  placement, label, placeholder, queryName, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  label: string,
  placeholder: string,
  queryName: string,
  items: string[],
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const defaultValue= searchParams.get(queryName)?.toString();

  const [value, setValue] = React.useState<string>(defaultValue);

  const handleSelectionChange = (filter: string, queryName: string) => {
    const params = new URLSearchParams(searchParams);
    if(filter) {
      params.set(queryName, filter);
    } else {
      params.delete(queryName);
    }
    setValue(filter);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
    <Select
      selectedKeys={[value]}
      defaultSelectedKeys={[value]}
      labelPlacement={placement} label={label} placeholder={placeholder}
      className="w-36 sm:w-44 md:w-52 bg-background rounded-small" radius="sm"
      onChange={(e) => {
        handleSelectionChange(e.target.value, queryName);
      }}
    >
      {items.map((item) => (
        <SelectItem key={item}>
          {item}
        </SelectItem>
      ))}
    </Select>
    {/*  color="primary"<p className="text-small text-default-500">{value}</p> */}
  </>
  );
}