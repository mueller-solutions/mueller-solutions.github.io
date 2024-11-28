import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
// import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import minify from '@frontendista/astro-html-minify';

const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_TEST = process.env.NODE_ENV === 'test';
const siteURL = IS_DEV ? 'http://localhost:4321' : 'https://mueller-solutions.dev';
// const siteURL = 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site: siteURL,
  output: IS_TEST ? 'static' : 'hybrid',
  ...(!IS_TEST && {
    ...(IS_PROD && { adapter: netlify() }),
    // ...(IS_PROD && { adapter: node({ mode: 'standalone' }) }),
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
    ...(IS_PROD ? [minify()] : []),
  ],
  build: {
    inlineStylesheets: 'always',
    format: 'file',
  },
  redirects: {
    '/about': '/about-us',
  },
});
