import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['/workspace/src/__tests__/setupTests.ts'],  // Assuming a setup file; we'll create it if needed
  },
});
