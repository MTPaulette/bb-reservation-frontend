"use client"

import React from "react";
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Pagination, Button } from "@nextui-org/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function PaginationComponent({
  totalPages
}: {totalPages: number}) {

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = React.useState<number>(searchParams.get('page')? Number(searchParams.get('page')): 1);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if(page != currentPage){
      params.set('page', String(page));
      setCurrentPage(page);
      console.log(page)
      replace(`${pathname}?${params.toString()}`);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <p className="text-small text-default-500">Selected Page: {currentPage}</p>
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          disableRipple
          size="sm"
          className="bg-transparent"
          onPress={() => changePage(currentPage > 1 ? currentPage - 1 : currentPage)}
        >
          <ChevronLeftIcon className="w-5" />
        </Button>

        <Pagination
          total={totalPages}
          page={currentPage}
          onChange={changePage}
          classNames={{
            wrapper: "gap-0 overflow-visible h-8",
            item: "w-8 h-8 text-small rounded-full bg-transparent",
            cursor:
              "text-white bg-gradient-to-br from-success to-warning font-bold rounded-full",
          }}
        />

        <Button
          isIconOnly
          disableRipple
          size="sm"
          className="bg-transparent"
          onPress={() => changePage(currentPage < totalPages ? currentPage + 1 : currentPage)}
        >
          <ChevronRightIcon className="w-5" />
        </Button>
      </div>
    </div>
  );
}
