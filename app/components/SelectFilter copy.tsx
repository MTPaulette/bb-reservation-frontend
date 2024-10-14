"use client";

import {Select, SelectItem} from "@nextui-org/react";
import { label } from "framer-motion/client";
import React from "react";

export default function SelectFilter({
  placement, label, placeholder, items
}: { 
  placement: "outside" | "outside-left" | "inside" | undefined,
  label: string,
  placeholder: string,
  items: string[]
}) {
  const [value, setValue] = React.useState(new Set([]));

  return (
    <>
    <Select
      selectedKeys={value} onSelectionChange={setValue}
      labelPlacement={placement} label={label} placeholder={placeholder}
      className="w-36 md:w-52 bg-background rounded-small" radius="sm"
    >
      {items.map((item, index) => (
        <SelectItem key={index} color="primary">
          {item}
        </SelectItem>
      ))}
    </Select>
    {/* <p className="text-small text-default-500">Selected: {value}</p> */}
  </>
  );
}