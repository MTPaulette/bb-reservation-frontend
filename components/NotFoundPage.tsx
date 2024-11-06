"use client";

import { FaceFrownIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import Title from "./Title";
import { Button } from "@nextui-org/react";
import { useRouter } from "@/i18n/routing";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center gap-2 bg-green-200">
      <FaceFrownIcon fill="green" size={100} />
      <Title className="text-xl font-semibold">{t("title")}</Title>
      <p className="text-justify mt-2 mb-6">{t("description")}</p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quas provident, voluptates delectus ipsam consectetur illum ad voluptatem quaerat. Explicabo magnam tempore cumque. Iure veniam rem nisi dicta suscipit dolores!
      <Button
        onClick={() => {router.back()}}
        color="primary" size="md" radius="sm"
      >
        {t("back")}
      </Button>
    </main>
  );
}
