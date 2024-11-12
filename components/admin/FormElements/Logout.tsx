"use client"

import { LogoutIcon } from "@/components/Icons";
import { signOut } from 'next-auth/react';
import { useState } from "react";
import { useSession, getCsrfToken } from "next-auth/react";
import { useTranslations } from 'next-intl';

export default function Logout() {
  const t = useTranslations("Input");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleLogout = async () => {
    setLoading(true);
    const csrfToken = await getCsrfToken();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "X-XSRF-TOKEN": csrfToken,
          Authorization: "Bearer "+session?.user.token,
        },
        withCredentials: true,
        withXSRFToken: true,
      });

      setLoading(false);

      if(response.ok) {
        await signOut({
          callbackUrl: "/fr/reservations"
        });
      }
  
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <button onClick={handleLogout}
      className={`
        rounded-sm px-4 py-2 duration-300 ease-in-out
        flex w-full items-center justify-center gap-2.5 rounded-mdd text-foreground
        p-3 font-medium hover:bg-danger/20 hover:text-danger md:flex-none md:justify-start 
        ${loading ? "cursor-progress": ""}`}
    >
      <LogoutIcon fill="currentColor" size={18} />
      <div>{t("logout")}</div>
    </button>
  );
}