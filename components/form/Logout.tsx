"use client"

import { LogoutIcon } from "@/components/Icons";
import { signOut } from 'next-auth/react';
import { useState } from "react";
import { useSession, getCsrfToken } from "next-auth/react";

export default function Logout() {
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
        flex h-[48px] md:h-[36px] w-full items-center justify-center gap-2 rounded-md 
        p-3 text-sm font-medium hover:bg-danger/20 text-danger md:flex-none md:justify-start 
        md:p-2 md:px-3 ${loading ? "cursor-progress": ""}`}
    >
      <LogoutIcon fill="currentColor" size={24} />
      <div>Log Out</div>
    </button>
  );
}


