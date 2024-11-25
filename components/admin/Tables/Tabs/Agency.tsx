"use client"

import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useLocale, useTranslations } from "next-intl";

export default function AgencyTabs() {
  const [selected, setSelected] = React.useState<string>("administrators");
  const locale = useLocale();
  const t_agency = useTranslations("Agency");

  return (
    <div className="flex w-full flex-col">
      <Tabs 
        aria-label="Options"
        color="primary"
        radius="sm"
        variant="solid"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="administrators" title={t_agency("administrators")}>
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="ressources" title={t_agency("ressources")}>
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="reservations" title={t_agency("reservations")}>
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
    </div>  
  );
}
