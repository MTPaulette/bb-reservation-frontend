"use client";

import React from "react";
// import Image from "next/image";
import { Button } from "@nextui-org/react";
import { RessourceDefaultType } from "@/lib/definitions";
import { capitalize, formatCurrency, getImageUrl } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { validitiesName as validities } from "@/lib/data";


import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@nextui-org/react";

export default function RessourceCard(
  { ressource, color } : 
  {ressource: RessourceDefaultType , color: string
}) {
  const locale = useLocale();
  const t_default = useTranslations("Default");

  return (
    <>
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-x-5 w-full">
          <div className="flex-shrink-0">
            <Avatar
              isBordered
              radius="full"
              // size="lg"
              className="rounded-full h-25 w-25"
              src={ressource.image? getImageUrl(ressource.image): "/images/brain-orange-400.png"}
            />
          </div>
          <div className="flex flex-col w-full gap-1 items-end justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{ressource.space}</h4>
            <div className="w-full flex gap-x-4 -mr-5 text-small text-foreground/90">
              <p style={{ color: color }} className="font-medium">{ressource.agency}</p>
              <h5 className="text-small tracking-tight text-default-400">
                <span className="font-semibold">{ressource.nb_place}</span> {t_default("sits")}
              </h5>
            </div>
            <div className="mt-2 w-full relative flex justify-end">
              {/*<Button
                className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
                color="primary"
                radius="full"
                size="sm"
                variant={isFollowed ? "bordered" : "solid"}
                onPress={() => setIsFollowed(!isFollowed)}
              >
                
                Réservez maintenant
              </Button>*/}
              
              <Button
                color="primary"
                radius="full"
                size="sm"
                variant="bordered"
                className="bg-transparent text-foreground border-default-200"
              >
                Réservez maintenant
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <ul className="flex flex-wrap justify-between items-center text-xs md:text-sm font-normal dark:font-light my-4 w-full">
          <li>
            {locale === "en" ? validities[0].name_en: validities[0].name_fr}:
            <span className="font-bold pl-2 text-xs">{ressource.price_hour? formatCurrency(ressource.price_hour) : ""}</span>
          </li>
          <li className="whitespace-nowrap">
            {locale === "en" ? validities[1].name_en: validities[1].name_fr}:
            <span className="font-bold pl-2 text-xs">{ressource.price_midday? formatCurrency(ressource.price_midday) : ""}</span>
          </li>
          <li>
            {locale === "en" ? validities[2].name_en: validities[2].name_fr}:
            <span className="font-bold pl-2 text-xs">{ressource.price_day? formatCurrency(ressource.price_day) : ""}</span>
          </li>
          <li>
            {locale === "en" ? validities[3].name_en: validities[3].name_fr}:
            <span className="font-bold pl-2 text-xs">{ressource.price_week? formatCurrency(ressource.price_week) : ""}</span>
          </li>
          <li>
            {locale === "en" ? validities[4].name_en: validities[4].name_fr}:
            <span className="font-bold pl-2 text-xs">{ressource.price_month? formatCurrency(ressource.price_month) : ""}</span>
          </li>
        </ul>
      </CardBody>
      <CardFooter className="gap-3">
        <ul className="flex flex-wrap text-xs md:text-sm font-normal dark:font-light h-[48px] md:h-[60px] truncate w-full">
          {ressource.characteristics.map((item, index) => (
            <li key={index} className="pr-2">
              {capitalize(locale === "en" ? item.name_en: item.name_fr)},
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
    </>
  );
}