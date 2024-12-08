import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import partytown from '@astrojs/partytown';
import minify from '@frontendista/astro-html-minify';
import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env);

const PORT = parseInt(process.env.PORT || '4321');
const IS_DEV = process.env.NODE_ENV === 'development';
const IS_PROD = process.env.NODE_ENV === 'production';
const IS_TEST = process.env.NODE_ENV === 'test';
const IS_PREVIEW = process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy';
const siteURL = IS_DEV ? `http://localhost:${PORT}` : process.env.URL;
const site = IS_PREVIEW ? process.env.DEPLOY_PRIME_URL : siteURL;
const IS_LOCAL = site?.startsWith('http://localhost') || false;

// https://astro.build/config
export default defineConfig({
  site: site,
  output: IS_TEST ? 'static' : 'server',
  ...(!IS_TEST && {
    ...(IS_LOCAL ? { adapter: node({ mode: 'standalone' }) } : { adapter: netlify() }),
  }),
  server: {
    port: PORT,
    host: true,
  },
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
