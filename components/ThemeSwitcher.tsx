"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div>
      <label
        className={`relative m-0 block h-7.5 w-14 rounded-full ${
          theme === "dark" ? "bg-primary" : "bg-stroke"
        }`}
      >
        <input
          type="checkbox"
          onChange={() => {
            if (theme === "dark") {
              setTheme("light")
            } else {
              setTheme("dark")
            }
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span
          className={`absolute left-[3px] top-1/2 flex h-6 w-6 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            theme === "dark" && "!right-[3px] !translate-x-full"
          }`}
        >
          <span className="dark:hidden">
            <SunIcon fill="none" size="16" />
          </span>
          <span className="hidden dark:inline-block">
            <MoonIcon fill="none" size="16" />
          </span>
        </span>
      </label>
    </div>
  )
};
