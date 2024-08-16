import { defineConfig } from 'astro/config';
import purgecss from 'astro-purgecss';
import playformCompress from '@playform/compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';

const siteURL = 'https://mueller-solutions.dev';

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  integrations: [
    purgecss(),
    sitemap({
      filter: (page) => page !== `${siteURL}/booking-confirmed/`,
    }),
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          disallow: ['/privacy-policy'],
        },
        {
          userAgent: '*',
          disallow: ['/booking-confirmed'],
        },
      ],
    }),
    playformCompress(),
  ],
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
});
