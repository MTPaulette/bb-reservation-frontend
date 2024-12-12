"use client"

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { PencilSquareIcon, TrashIcon, UploadIcon } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { useLocale, useTranslations } from 'next-intl';
import Alert from "@/components/Alert";
import { SpaceType, SpaceFormType } from "@/lib/definitions";
import { getCharacteristics } from "@/lib/action/characteristics";
import Title from "@/components/Title";
import { deleteImage, updateSpace, uploadImages } from "@/lib/action/spaces";
import { capitalize, getImageUrl } from "@/lib/utils";
import Image from "next/image";


export default function EditSpace({ space }: { space: SpaceType} ) {
  const t = useTranslations("Input");
  const t_error = useTranslations("InputError");
  const locale = useLocale();


  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<number[]>([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [save, setSave] = useState<boolean>(false);
  const [images, setImages] = useState<FileList|null>(null);

  const schema: ZodType<SpaceFormType> = z
    .object({
      name: z.string().min(1, { message: t_error("name") }).max(250),
      nb_place: z.string().min(1),
      description_en: z.string().min(1),
      description_fr: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SpaceFormType>({
    resolver: zodResolver(schema),
  })

  let perms: number[] = [];
  useEffect(() => {
    getCharacteristics()
      .then(async (res) => {
        setLoading(false);
        if(res?.ok){
          setCharacteristics(await res.json());
        }
    });
    space.characteristics.forEach(characteristic => {
      perms.push(characteristic.id);
    });
    setSelectedCharacteristics(perms);
    perms = [];
  }, []);

  const handleCheckboxChange = (e: { target: { value: string; checked: any; }; }) => {
    const characteristicId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedCharacteristics((prevCharacteristics) => [...prevCharacteristics, characteristicId]);
    } else {
      setSelectedCharacteristics((prevCharacteristics) =>
        prevCharacteristics.filter((characteristic) => characteristic !== characteristicId)
      );
    }
  };

  const handleUploadImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < images!.length; i++) {
      formData.append('images[]', images![i]);
    }
    setError("");
    setLoading(true);
    uploadImages(formData, space.id)
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        const response = await res.json();
        setSuccess(t("update_space_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("space_not_found"));
            break;
          case 422:
            const err = await res.json();
            setError(JSON.stringify(err.errors));
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    })
  };

  const handleFormSubmit = async (data: SpaceFormType) => {
    setError("");
    setSuccess("");
    setSave(true);
    updateSpace(data, space.id, selectedCharacteristics)
    .then(async (res) => {
      setSave(false);
      if(res?.ok) {
        if(images){
          handleUploadImages();
        }else {
          setSuccess(t("update_account_success_msg"));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("space_not_found"));
            break;
          case 422:
            const err = await res.json();
            setError(JSON.stringify(err.errors));
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    });
  }

  const handleDeleteImage = async (image_id: number) => {
    setError("");
    setSuccess("");
    setSave(true);
    deleteImage(image_id)
    .then(async (res) => {
      setSave(false);
      if(res?.ok) {
        setSuccess(t("delete_image_success_msg"));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        const status = res.status;
        switch(status) {
          case 404:
            setError(t_error("image_not_found"));
            break;
          case 422:
            const err = await res.json();
            setError(JSON.stringify(err.errors));
            break;
          case 403:
            setError(t_error("acces_denied"));
            break;
          case 500:
            setError(t_error("something_wrong"));
            break;
          default:
            break;
        }
      }
    })
    .catch((error) => {
      setError(t_error("something_wrong"));
      console.error(error);
    });
  }


  type CharacteristicType = typeof characteristics[0];

  return (
    <>
    <div className="w-full">
      {error != "" ? (
        <Alert color="danger" message={error} />
      ) : null}
      {success != "" ? (
        <Alert color="success" message={success} />
      ) : null}
      <form
        action="#" className="space-y-4 mt-4"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input
            isRequired
            autoFocus
            label={t("name")}
            type="text"
            placeholder={t("name_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-full sm:w-3/4"
            {...register("name")}
            isInvalid={errors.name ? true: false}
            errorMessage={errors.name ? errors.name?.message: null}
            defaultValue={space.name? space.name: ""}
          />
          <Input
            isRequired
            label={t("nb_place")}
            type="number"
            placeholder={t("nb_place_placeholder")}
            labelPlacement="outside"
            classNames={{inputWrapper: "bg-input rounded-small"}}
            className="w-full sm:w-1/4"
            {...register("nb_place")}
            isInvalid={errors.nb_place ? true: false}
            errorMessage={errors.nb_place ? errors.nb_place?.message: null}
            defaultValue={space.nb_place? space.nb_place: ""}
          />
        </div>
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("description_en")}
          placeholder={t("description_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("description_en")}
          isInvalid={errors.description_en ? true: false}
          errorMessage={errors.description_en ? errors.description_en?.message: null}
          defaultValue={space.description_en? space.description_en: ""}
        />
        <Textarea
          isRequired
          endContent={
            <PencilSquareIcon fill="currentColor" size={18} />
          }
          label={t("description_fr")}
          placeholder={t("description_placeholder")}
          labelPlacement="outside"
          classNames={{inputWrapper: "bg-input rounded-small"}}
          {...register("description_fr")}
          isInvalid={errors.description_fr ? true: false}
          errorMessage={errors.description_fr ? errors.description_fr?.message: null}
          defaultValue={space.description_fr? space.description_fr: ""}
        />

        {/* images */}
        <Title className="text-xl">{t("images")}</Title>
        
        <div className="flex flex-wrap items-center gap-3 w-full">
          {space.images.map((item) => (
            <div key={item.id} className="flex-shrink-0 relative">
              <Button
                onClick={() => handleDeleteImage(item.id)}
                isIconOnly radius="full" size="sm"
                className="absolute top-0 right-0 data-[hover=true]:text-white data-[hover=true]:bg-danger"
                aria-label="delete image"
                title={t("delete_image")}
              >
                <TrashIcon fill="currentColor" size={12} />
              </Button>
              <Image src={getImageUrl(item.src)} alt="space image" width={120} height={120} />
            </div>
          ))}
        </div>

        <div
          id="FileUpload"
          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-transparent dark:bg-content2 px-4 py-4 sm:py-7.5"
        >
          <input
            type="file" multiple
            onChange={(e) => setImages(e.target.files)}
            className="absolute inset-0 z-1 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
          />
          <div className="flex flex-col items-center justify-center space-y-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-divider bg-white dark:bg-boxdark">
              <UploadIcon fill="#3C50E0" size={16} />
            </span>
            <p className="text-primary text-justify">
              {t("drap_drop_space")}
            </p>
            <p className="mt-1.5">SVG, PNG, JPG, GIF</p>
            <p>(max, 800 X 800px)</p>
          </div>
        </div>

        {/* characteristics */}
        <Title className="text-xl">{t("characteristics")}</Title>
        <div className="pb-4 px-6">
          {characteristics.map((characteristic: CharacteristicType) => (
            <ul key={characteristic.id} className="flex gap-4 p-1">
              <Checkbox
                value={characteristic.id}
                onChange={handleCheckboxChange}
                isSelected={selectedCharacteristics.includes(characteristic.id)}
                className="z-1"
              />
              <li className="font-light text-sm text-foreground">
                {locale === "en" ? capitalize(characteristic.name_en): capitalize(characteristic.name_fr)}
              </li>
            </ul>
          ))}
        </div>

        <div className="w-full">
          <Button 
            type="submit"
            color="primary"
            isLoading={save}
            className="w-full"
          >
            {t("save")}
          </Button>
        </div>
      </form>
    </div>
    </>
  )
}