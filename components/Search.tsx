'use client'

import React from "react";
import { SearchIcon } from "@/components/Icons";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from "@nextui-org/react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState<string|undefined>(searchParams.get('query')?.toString());
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    console.log(`Searching... ${term}`);
    setValue(term);

    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      variant="flat"
      isClearable
      size="md"
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-foreground/50 dark:placeholder:text-white/60 placeholder:text-base",
        ],
        innerWrapper: "bg-transparent",
      }}
      placeholder={placeholder}
      startContent={
        <span className="text-black/50 mb-0.5 mr-2 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0 w-5">
          <SearchIcon fill="currentColor" size={20} />
        </span>
      }
      value={value}
      onValueChange={(value) => {
        handleSearch(value);
      }}
    />
  );
}
{/*
  
      isClearable
      radius="lg"
      size="md"
      classNames={{
        label: "text-black/50 dark:text-white/90",
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-foreground/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "shadow-md md:shadow-lg",
          "bg-default-200/50",
          "dark:bg-default/60",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",
          "dark:hover:bg-default/70",
          "group-data-[focus=true]:bg-default-200/50",
          "dark:group-data-[focus=true]:bg-default/60",
          "!cursor-text",
        ],
      }}
 */}