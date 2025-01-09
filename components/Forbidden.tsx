"use client";

import { FaceFrownIcon } from "@/components/Icons";
import { useTranslations } from "next-intl";
import Title from '@/components/Title';
import Head from 'next/head';

export default function ForbiddenComponent() {
  const t = useTranslations("NotFound");

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Head>
        <title>Erreur 403 - Accès interdit</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content="5;url=/" />
      </Head>
      <FaceFrownIcon fill="none" size={50} />
      <Title className="text-xl font-semibold tracking-tight">Erreur 403 - Accès interdit</Title>
      <p className="text-justify mt-2 mb-6">Vous n&#39;avez pas les droits nécessaires pour accéder à cette page.</p>
      {/* <p className="text-justify mt-2 mb-6">{t("description")}</p> */}
    </div>
  );
}
