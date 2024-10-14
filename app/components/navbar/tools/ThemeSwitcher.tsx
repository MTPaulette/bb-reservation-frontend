"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/24/solid";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      <button onClick={() => setTheme("dark")} className={theme === "light" ? "inline":"hidden"} title="swith to dark mode">
        <MoonIcon className="w-5 mt-1.5" />
      </button>
      <button onClick={() => setTheme("light")} className={theme === "dark" ? "inline":"hidden"} title="swith to light mode">
        <SunIcon className="w-5 mt-1.5" />
      </button>
    </div>
  )
};
