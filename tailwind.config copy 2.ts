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
            foreground: "#08062F", //"#0D001A",
            focus: "#F182F6",
            default: {
              foreground: "#000000",
            },
            primary: { 
              100: "#FEF4CC",
              200: "#FDE699",
              300: "#FBD466",
              400: "#F7C040",
              500: "#F2A304",
              600: "#D08502",
              700: "#AE6902",
              800: "#8C4F01",
              900: "#743E00",
              DEFAULT: "#F2A304",
            },
            secondary: {
              100: "#F8F8F9",
              200: "#F1F1F4",
              300: "#DBDBDF",
              400: "#BCBCC0",
              500: "#929296",
              600: "#222222",
              700: "#49496C",
              800: "#2E2E57",
              900: "#1C1C48",
              DEFAULT: "#929296",
              foreground: "#000",
            },
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
            foreground: "#DBDBDF",//"#DBDBDF",
            focus: "#F182F6",
            default: {
              foreground: "#ffffff",
            },
            primary: { 
              100: "#FEF4CC",
              200: "#FDE699",
              300: "#FBD466",
              400: "#F7C040",
              500: "#F2A304",
              600: "#D08502",
              700: "#AE6902",
              800: "#8C4F01",
              900: "#743E00",
              DEFAULT: "#F2A304",
            },
            secondary: {
              100: "#F8F8F9",
              200: "#F1F1F4",
              300: "#DBDBDF",
              400: "#BCBCC0",
              500: "#929296",
              600: "#222222",
              700: "#49496C",
              800: "#2E2E57",
              900: "#1C1C48",
              DEFAULT: "#929296",
              foreground: "#000",
            },
          },
        },
      },
    }),
  ],
};
export default config;