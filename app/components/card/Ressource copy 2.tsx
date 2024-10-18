import React from "react";
import {Card, CardBody, Image, Button} from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function RessourceCard() {
  return (
    <>
    <Card
      isBlurred
      //className="border-none border-0 shadow-none bg-transparent w-[510px] h-[200px]"
      radius="md"
      className="border-none bg-background dark:bg-background/70 w-[500px] md:w-[390px] lg:w-[500px]"
      classNames={{
        body: "p-0 m-0"
      }}
      
      // className="border-none bg-background dark:bg-background/70 w-[510px] h-[200px]"
    >
      <CardBody>
        <div className="grid grid-cols-12 items-start justify-center">
        {/* <div className="grid grid-cols-12 items-start justify-center"> */}
          <div className="relative col-span-4 flex-shrink-0">
            <Image
              alt="Album cover"
              className="object-cover"
              //height="100%"
              height={180}
              shadow="md"
              radius="none"
              src="/images/brain-orange-400.png"
              width="100%"
            />
          </div>

          <div className="col-span-8 h-full flex flex-col justify-between p-3 md:p-4 md:pt-1">
          {/* <div className="col-span-7 h-full flex flex-col justify-between bg-background dark:bg-background/70 p-2 border rounded-md"> */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-0">
                <h3 className="font-semibold text-foreground/90 h-[20px] truncate mt-1 md:mt-2 w-full whitespace-normal">Daily Mix</h3>
                <p className="text-small text-foreground/80">12 Tracks</p>
                <h1 className="text-small text-justify font-medium text-foreground/60 h-[60px] truncate mt-2 w-full whitespace-normal">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla harum omnis inventore beatae
                  incidunt facilis, dicta ipsam, tempore consectetur blanditiis voluptatum quod iure tempo
                  ra officiis aliquam dolore rerum voluptas numquam?
                </h1>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Button
                disableRipple radius="sm" variant="solid"
                size="sm" color="primary"
                startContent={<CheckIcon className="w-4" />}
              >
                Réservez maintenant
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
    </>
  );
}