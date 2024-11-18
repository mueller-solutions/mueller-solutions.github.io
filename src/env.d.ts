/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WP_API_URL: string;
  readonly JWT_SECRET: string;
  readonly ZAPIER_API_URL: string;
  readonly GTM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
