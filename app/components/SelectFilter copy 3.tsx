"use client";

import {Select, SelectItem} from "@nextui-org/react";
import React, { useEffect, useMemo, useState} from "react";

const values : string[] = [];

function valuesI(value: string) {
  values.push(value);
}

export default function SelectFilter({
  placement, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  items: { label: string; placeholder: string; items: string[]; }[]
}) {
  const [value, setValue] = React.useState(new Set([]));


  return (
    <>
    <div className="flex w-full flex-wrap items-end justify-between md:justify-normal md:flex-nowrapp mt-8 mb-6 md:mb-0 gap-x-4 gap-y-6">
      {items.map((filter, index) => (
        <>
        <Filter
          items={filter.items} key={index}
          placement={placement} label={filter.label} placeholder={filter.placeholder}
        />
        <p className="text-small text-default-500">values: {values}</p>
        </>
      ))}
    </div>
  </>
  );
}

export function Filter({
  placement, label, placeholder, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  label: string,
  placeholder: string,
  items: string[]
}) {

//  const [value, setValue] = React.useState(new Set([]));
let value = React.useState('');
function setValue(e) {
  value = e.target.value;
  console.log(e.target);
  valuesI(value)
}

  return (
    <>
    <Select
      onChange={setValue} //selectedKeys={value} onSelectionChange={setValue}
      labelPlacement={placement} label={label} placeholder={placeholder}
      className="w-36 md:w-52 bg-background rounded-small" radius="sm"
    >
      {items.map((item) => (
        <SelectItem key={item} color="primary">
          {item}
        </SelectItem>
      ))}
    </Select>
    <p className="text-small text-default-500">Selected: {value}</p>
  </>
  );
}