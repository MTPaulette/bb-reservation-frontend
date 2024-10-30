import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--nextui-background)", //"var(--background)",
        // foreground: "var(--nextui-foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false,
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "14px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#111",
            divider: "rgba(17,17,17,0.15)",
            focus: "#006FEE",
            content1: "#ffffff",
            content2: "#f3f4f6",
            content3: "#eee", // "#e4e4e7",
            content4: "#d4d4d8",
            default: "#d4d4d8", //gris pour les hover des dropdown
            primary: {
              DEFAULT: "#262262",// bleu rgb(38, 34, 98)
              foreground: "#fff",
            },
            secondary: {
              DEFAULT: "#fff",
              foreground: "#111",
            },
            success: "#0B9444", // vert
            warning: "#F2A304", //orange //FDE699
          },
          layout: {
            disabledOpacity: "0.3",
            hoverOpacity: 0.8,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
            },
          },
        },


        dark: {
          layout: {
            disabledOpacity: "0.3",
            hoverOpacity: 0.9,
            boxShadow: {
              small:
                "0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              medium:
                "0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
              large:
                "0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)",
            },
          },
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            divider: "rgba(255,255,255,0.15)",
            focus: "#006FEE",
            content1: "#18181b",
            content2: "#27272a",
            content3: "#3f3f46",
            content4: "#52525b",
            default: "#3f3f46", //gris pour les hover des dropdown
            primary: {
              DEFAULT: "#929296", // bleu
              foreground: "#fff",
            },
            secondary: {
              DEFAULT: "#fff",
              foreground: "#111",
            },
            success: "#0B9444", // vert rgb(11, 148, 68)
            warning: "#F2A304", //orange //FDE699
          },
        },
      },
    }),
  ],
};
export default config;