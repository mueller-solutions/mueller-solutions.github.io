/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    setupFiles: './config/vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
    },
  },
});
