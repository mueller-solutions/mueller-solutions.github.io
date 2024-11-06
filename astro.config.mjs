import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_TEST = process.env.NODE_ENV === 'test';
const siteURL = IS_DEV ? 'http://localhost:4321' : 'https://mueller-solutions.dev';

const excludedPages = ['booking-confirmed', 'checklist-registration-success', 'contact-success'];

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  output: IS_TEST ? 'static' : 'server',
  ...(!IS_TEST && {
    adapter: netlify(),
  }),
  prefetch: true,
  integrations: [
    partytown({
      config: {
        debug: IS_DEV,
        logCalls: false,
        logGetters: false,
        logSetters: false,
        logImageRequests: false,
        logScriptExecution: false,
        logStackTraces: false,
        forward: ['dataLayer.push'],
        resolveUrl: (url, location) => {
          const proxyUrl = new URL(location.origin);
          if (
            url.hostname === 'googleads.g.doubleclick.net' ||
            url.hostname === 'www.googleadservices.com' ||
            url.hostname === 'googletagmanager.com' ||
            url.hostname === 'www.googletagmanager.com' ||
            url.hostname === 'region1.google-analytics.com' ||
            url.hostname === 'google.com'
          ) {
            proxyUrl.searchParams.append('apiurl', url.href);
            return proxyUrl;
          }
          return url;
        },
      },
    }),
    sitemap({
      filter: (page) => !excludedPages.includes(page.split('/').pop()),
    }),
    robotsTxt({
      policy: excludedPages.map((page) => ({
        userAgent: '*',
        disallow: [`/${page}`],
      })),
    }),
  ],
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
});
