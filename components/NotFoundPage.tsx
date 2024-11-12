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
    // <main className="relative h-screen w-full flex flex-col items-center justify-center gap-2 bg-green-200">
      <div>
      <FaceFrownIcon fill="green" size={100} />
      <Title className="text-xl font-semibold">{t("title")}</Title>
      <p className="text-justify mt-2 mb-6">{t("description")}</p>
      <Button
        onClick={() => {router.back()}}
        color="primary" size="md" radius="sm"
      >
        {t("back")}
      </Button>
    </div>
  );
}
