"use client";

import { FaceFrownIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Title from './Title';

export default function NotFound({title}: {title: string}) {
  const t = useTranslations("NotFoundPage");
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon fill="none" size={50} />
      <Title className="text-xl font-semibold tracking-tight">{t(title)}</Title>
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
