import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',

    include: ['src/models/*.test.ts', 'src/shared/*.test.ts'],
    exclude: ['node_modules', 'dist'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/models/*.test.ts', 'src/shared/*.test.ts'],
      exclude: ['src/**/*.test.ts', 'src/config/**'],
    },

    globals: true,
    clearMocks: true,
  },
});
