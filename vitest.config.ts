/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error Vitest is not part of the types
  test: {
    setupFiles: './config/vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
    },
  },
});
