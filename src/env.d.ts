/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly JWT_SECRET: string;
  readonly ZAPIER_API_URL: string;
  readonly GTM_ID: string;
  readonly TINA_CLIENT_ID: string;
  readonly TINA_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
