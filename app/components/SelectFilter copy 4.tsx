"use client";

import {Select, SelectItem} from "@nextui-org/react";
import React from "react";

export default function SelectFilter({
  placement, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  items: { label: string; placeholder: string; items: string[]; }[]
}) {

  const [value, setValue] = React.useState<string>("");
  const [values] = React.useState<string[]>([]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    valuesI(e.target.value)
  };

  function valuesI(value: string) {
    values.push(value);
  }
  
  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between md:justify-normal md:flex-nowrapp mt-8 mb-6 md:mb-0 gap-x-4 gap-y-6">
      {items.map((filter, index) => (
        <>
        <Select
          onChange={handleSelectionChange}
          selectedKeys={value} key={index}
          labelPlacement={placement} label={filter.label} placeholder={filter.placeholder}
          className="w-36 md:w-52 bg-background rounded-small" radius="sm"
        >
          {filter.items.map((item, index) => (
            <SelectItem key={index} color="primary">
              {item}
            </SelectItem>
          ))}
        </Select>
        </>
      ))}
    </div>
        <p className="text-small text-default-500">Selected: {values}</p>
  </>
  );
}