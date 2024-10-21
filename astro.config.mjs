import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import playformCompress from '@playform/compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import serviceWorker from 'astrojs-service-worker';

const siteURL = 'https://mueller-solutions.dev';

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  output: 'server',
  adapter: netlify({
    imageCDN: true,
  }),
  integrations: [
    serviceWorker(),
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
