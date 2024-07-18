import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        text: "0px 1px 2px rgb(0 0 0 / 80%)",
        header: "0px 4px 10px rgb(0 0 0 / 25%)",
        "button-sm": "0px 3px 10px rgb(0 0 0 / 15%)",
        "button-lg": "0px 4px 4px rgb(0 0 0 / 25%)",
      },
      backgroundImage: {
        hero: "#145285, url('/images/hero-background.jpg')",
      },
    },
    colors: {
      dark: "#454545",
      light: "#FFFFFF",
      body: "#F1F1F1",
      "gray-light": "#BDBDBD",
      "gray-dark": "#A0A0A0",
      "primary-dark": "#145285",
      "primary-light": "#0B80C5",
      shine: "#FFFCF1",
      orange: "#FF9416",
      yellow: "#FFD540",
    },
  },
  plugins: [],
};
