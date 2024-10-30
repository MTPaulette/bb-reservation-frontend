"use client"

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Logout() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const [csrfToken, setCsrfToken] = useState<string|null>(null);

  useEffect(() => {
    const csrfTokenCookie = getCookie("csrf-token=");
    setCsrfToken(csrfTokenCookie);
  }, [])

  const getCookie = (name: string) => {
    console.log("wanad");
    const cookies = document.cookie.split(";");
    const cookie = cookies.find((cookie) => cookie.startsWith(name));
    // const cookie = cookies.find((cookie) => cookie.startsWith(name+"="));
    return cookie? cookie.split("=")[1]: null;
  }


  const handleLogout = async () => {
    setLoading(true);
    console.log("++++++++++++++++++++++++++++++++csrfToken");
    console.log(csrfToken);
    /*
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          // Authorization: "Bearen 41|wpG3j3g4hGeWL5hN7k489tIHM0aph7aVzJX1aRt44f2e5700",
          Authorization: "Bearen "+session?.user.token,
        },
      })
        console.log("====================================");
        console.log(response);
  
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
      */
  }

  return (
    <button onClick={handleLogout}
      className={`
        flex h-[48px] md:h-[36px] w-full grow items-center justify-center gap-2 rounded-md 
        p-3 text-sm font-medium hover:bg-danger/20 text-danger md:flex-none md:justify-start 
        md:p-2 md:px-3 ${loading ? "cursor-progress": ""}`}
    >
      <PowerIcon className="w-6" />
      <div>Sign Out 41|wpG3j3g4hGeWL5hN7k489tIHM0aph7aVzJX1aRt44f2e5700</div>
    </button>
  );
}


{/* <button type="button" @click="logout()" :class="logout_processing?'cursor-progress':''" class="flex items-center w-full px-4 py-2 hover:text-danger">Logout</button> */}

/*

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export default function Logout() {
  return (
    <form action={() => {signOut();}}
    >
      <button type="submit"
        className="flex h-[48px] md:h-[36px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-danger/20 text-danger md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        <div>Sign Out</div>
      </button>
    </form>
  );
}
*/