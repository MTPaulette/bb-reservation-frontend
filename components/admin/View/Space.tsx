"use client"

import React from "react";
// import Image from "next/image";
import { getSpaceById } from '@/lib/action/spaces';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { CommonSkeleton } from '@/components/Skeletons';
import Title from "@/components/Title";
import { capitalize, getImageUrl } from "@/lib/utils";
import CardDataStats from "@/components/admin/CardDataStats";

import { CharetIcon, EyeIcon, PeopleIcon, ShoppingBagIcon } from "@/components/Icons";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Card, CardBody, Image } from "@nextui-org/react";
import { VerticalDotsIcon } from "@/components/Icons";

import Modal from "@/components/Modal";
import EditSpace from "@/components/admin/FormElements/Space/Edit";
import DeleteSpace from "@/components/admin/FormElements/Space/Delete";
import { signOut } from 'next-auth/react';
import Alert from "@/components/Alert";
import { SpaceType } from "@/lib/definitions";

export default function ViewSpace({id}: {id: string}) {
  const [space, setSpace] = useState<SpaceType>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const locale = useLocale();
  const t_error = useTranslations("InputError");
  const t_table = useTranslations("Table");
  const t_space = useTranslations("Space");

  useEffect(() => {
    setError("");
    getSpaceById(Number(id))
      .then(async (res) => {
        if(res?.ok){
          const response = await res.json();
          setSpace(response);
          setLoading(false);
        }else {
          const status = res.status;
          switch (status) {
            case 401:
              setError(t_error("unauthenticated"));
              await signOut({
                callbackUrl: `/${locale}/auth/login`
              });
              break;
            case 403:
              setError(t_error("acces_denied"));
              break;
            case 404:
              setError(t_error("server_not_found"));
              break;
            case 500:
              setError(t_error("something_wrong"));
              break;
            default:
              break;
          }
        }
      })
      .catch(error => {
        setError(t_error("something_wrong"));
        console.error(error);
      });
  }, []);


  if (!space) {
    notFound();
  }

  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
    </div>
    {loading ? (
      <CommonSkeleton />
    ) : (
    <div className="overflow-hidden rounded-sm border border-divider bg-background shadow-default">
      <div className="px-6 lg:px-8 py-8 text-centerr lg:py-10 xl:py-13.5">
          <div className="relative flex justify-center items-center gap-1">
            <Title className="text-3xl font-semibold">
              {capitalize(space.name)}
            </Title>
            <div className="relative">
              <Dropdown className="bg-background border-1 border-default-200">
                <DropdownTrigger>
                  <Button isIconOnly radius="full" size="sm" variant="light" className="z-2">
                    <VerticalDotsIcon fill="none" size={24} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      setShowEditModal(true);
                    }}
                  >{t_table("edit")}</DropdownItem>
                  <DropdownItem
                    color="danger"
                    onClick={() => {
                      setShowDeleteModal(true);
                    }}
                  >{t_table("delete")}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          <div className="mx-auto max-w-203">
            <div className="flex gap-2 justify-center items-center">
              <span className="font-semibold">
                {space.nb_place}
              </span>
              <span className="text-sm sm:whitespace-nowrap">{capitalize(t_space("sits"))}</span>
            </div>
            <p className="font-light text-justify my-6">
              {locale === "en" ? space.description_en: space.description_fr}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque posuere fermentum urna, eu condimentum mauris
              tempus ut. Donec fermentum blandit aliquet. Etiam dictum
              dapibus ultricies. Sed vel aliquet libero. Nunc a augue
              fermentum, pharetra ligula sed, aliquam lacus.
            </p>
            <div>
              <Title className="text-lg font-medium mb-1.5">{capitalize(t_space("characteristics"))}</Title>
              <ul className="flex flex-wrap">
                  {space.characteristics.map((item) => (
                  <li key={item.id} className="border-r border-divider px-4">
                    {capitalize(locale === "en" ? item.name_en: item.name_fr)}
                  </li>
                ))}
              </ul>

            </div>
            <div className="my-6">
              <Title className="text-lg font-medium mb-4">{capitalize(t_space("images"))}</Title>
              <div className="flex flex-wrap items-center gap-2 lg:gap-4 xl:gap-6 w-full">
              {/* <div className="gap-2 grid grid-cols-2 sm:grid-cols-4"> */}
                {space.images.map((item) => (
                  <Image
                    width="100%"
                    alt="space image"
                    className="w-full object-cover h-[80px] lg:h-[140px] z-1"
                    src={getImageUrl(item.src)}
                  />
                ))}
              </div>
            </div>

            <div>
              <Title className="text-lg font-medium mb-1.5">{capitalize(t_table("some_stats"))}</Title>
            <div className="mt-4.5 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
              <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
                <EyeIcon fill="currentColor" size={20} />
              </CardDataStats>
              <CardDataStats title="Total Profit" total="$45,2K" rate="4.35%" levelUp>
                <CharetIcon fill="currentColor" size={20} />
              </CardDataStats>
              <CardDataStats title="Total Product" total="2.450" rate="2.59%" levelUp>
                <ShoppingBagIcon fill="currentColor" size={22} />
              </CardDataStats>
              <CardDataStats title="Total Spaces" total="3.456" rate="0.95%" levelDown>
                <PeopleIcon fill="currentColor" size={22} />
              </CardDataStats>
            </div>
            </div>
          </div>
        </div>


      <Modal
        open={showEditModal} close={() => setShowEditModal(false)}
        title={`${t_table("editSpace")} "${space? space.name: ""}"`}
      >
        <EditSpace space={space} />
      </Modal>

      <Modal
        open={showDeleteModal} close={() => setShowDeleteModal(false)}
        title={`${t_table("deleteSpace")} "${space? space.name: ""}"`}
      >
        <DeleteSpace id={space?.id} />
      </Modal>

    </div>
    )}
    </>
  )
}
