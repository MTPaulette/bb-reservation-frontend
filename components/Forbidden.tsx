"use client";

import { FaceFrownIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import Title from '@/components/Title';
import Head from 'next/head';

export default function ForbiddenComponent() {
  const t_notfound = useTranslations("NotFound");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Head>
        <title>{t_notfound("title_forbidden")}</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content="5;url=/" />
      </Head>
      <FaceFrownIcon fill="none" size={50} />
      <Title className="text-xl font-semibold tracking-tight">
        {t_notfound("title_forbidden")}
      </Title>
      <p className="text-justify mt-2 mb-6">
        {t_notfound("subtitle_forbidden")}
      </p>
    </div>
  );
}
