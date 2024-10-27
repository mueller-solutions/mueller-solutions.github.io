import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import playformCompress from '@playform/compress';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import serviceWorker from 'astrojs-service-worker';
import partytown from '@astrojs/partytown';

console.log('node env', process.env.NODE_ENV);
const IS_DEV = process.env.NODE_ENV === 'development';
const siteURL = IS_DEV ? 'http://localhost:4321' : 'https://mueller-solutions.dev';

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  output: 'server',
  adapter: IS_DEV ? node({ mode: 'standalone' }) : netlify(),
  image: {
    domains: ['media.licdn.com'],
  },
  integrations: [
    !IS_DEV && serviceWorker(),
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
        {
          userAgent: '*',
          disallow: ['/checklist-registration-success'],
        },
      ],
    }),
    playformCompress(),
    partytown({
      config: {
        debug: IS_DEV,
        logCalls: false,
        logGetters: false,
        logSetters: false,
        logImageRequests: false,
        logScriptExecution: false,
        logStackTraces: false,
        forward: ['dataLayer.push', 'pipedriveLeadboosterConfig'],
        resolveUrl: (url, location) => {
          const proxyUrl = new URL(location.origin);
          if (
            url.hostname === 'googleads.g.doubleclick.net' ||
            url.hostname === 'www.googleadservices.com' ||
            url.hostname === 'googletagmanager.com' ||
            url.hostname === 'www.googletagmanager.com' ||
            url.hostname === 'region1.google-analytics.com' ||
            url.hostname === 'google.com' ||
            url.hostname === 'www.google.com'
          ) {
            proxyUrl.searchParams.append('apiurl', url.href);
            return proxyUrl;
          }
          return url;
        },
      },
    }),
  ].filter(Boolean),
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
});
