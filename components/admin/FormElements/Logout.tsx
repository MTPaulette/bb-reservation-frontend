"use client"

import { LogoutIcon } from "@/components/Icons";
import { signOut } from 'next-auth/react';
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { logoutUser } from "@/lib/action/authentication";

export default function Logout() {
  const t = useTranslations("Input");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);

    logoutUser()
    .then(async (res) => {
      setLoading(false);
      if(res?.ok) {
        await signOut({
          callbackUrl: "/fr/reservations"
        });
      }
    })
    .catch((error) => {
      setLoading(false);
      console.log("Logout error: ");
      console.log(error);
    })
  }

  return (
    <button onClick={handleLogout}
      className={`
        rounded-sm px-4 py-2 duration-300 ease-in-out
        flex w-full items-center gap-2.5 text-foreground
        p-3 font-medium hover:bg-danger/20 hover:text-danger flex-none justify-start 
        ${loading ? "cursor-progress": ""}`}
    >
      <LogoutIcon fill="currentColor" size={18} />
      <div>{t("logout")}</div>
    </button>
  );
}