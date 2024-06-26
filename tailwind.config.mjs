import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        section: "0px 0px 6px 3px rgb(0 0 0 / 25%)",
        input: "inset 0px 2px 4px rgb(0 0 0 / 15%)",
        "input-hover": "inset 0px 3px 6px rgb(0 0 0 / 25%)",
      },
      backgroundImage: {
        hero: "#0B59AE, url('/images/hero-bg.png')",
      },
    },
  },
  plugins: [],
};
