/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error typing is messed up
  test: {
    setupFiles: './config/vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'html'],
    },
  },
});
