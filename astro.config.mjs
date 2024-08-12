import { defineConfig } from "astro/config";
import purgecss from "astro-purgecss";
import playformCompress from "@playform/compress";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mueller-solutions.dev",
  integrations: [purgecss(), sitemap(), robotsTxt(), playformCompress()],
  build: {
    inlineStylesheets: "always",
  },
});
