/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WP_API_URL: string;
  readonly JWT_SECRET: string;
  readonly PIPEDRIVE_API_URL: string;
  readonly PIPEDRIVE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
