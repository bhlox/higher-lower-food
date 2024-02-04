import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        dynaPuff: ["var(--font-dynaPuff)"],
        overpass: ["var(--font-overpass)"],
        canada: ["var(--font-canada)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "custom-pulse": {
          "50%": { opacity: "1", backgroundColor: "rgb(234 179 8)" },
        },
        dance: {
          "25%": { rotate: "6deg" },
          "75%": { rotate: "-6deg" },
        },
        "half-width": {
          to: { width: "51%" },
        },
        "full-width": {
          to: { width: "100%" },
        },
        "full-height": {
          // to: { gridTemplateRows: "1fr" },
          to: { height: "100%" },
        },
        "to-white-bg": {
          to: { backgroundColor: "white" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "custom-pulse":
          "custom-pulse 0.9s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        dance:
          "dance 0.7s cubic-bezier(0.4, 0, 0.6, 1), dance 3s 1s cubic-bezier(0.4, 0, 0.6, 1),dance 0.7s 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
} satisfies Config;

export default config;
