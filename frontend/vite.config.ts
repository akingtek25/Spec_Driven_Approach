// Vite configuration
// This file centralizes dev server, build, and path alias settings.
// Junior Dev Note: If you add a new alias in tsconfig "paths", mirror it here
// so that both TypeScript (editor) and Vite (runtime bundler) resolve it.

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname so path.resolve works with TypeScript + module=ESNext
// (If @types/node isn't installed yet, add it: npm i -D @types/node)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper to build the alias map. Keep in sync with tsconfig.json paths.
const alias: Record<string, string> = {
  '@': path.resolve(__dirname, './src'),
  '@components': path.resolve(__dirname, './src/components'),
  '@hooks': path.resolve(__dirname, './src/hooks'),
  '@services': path.resolve(__dirname, './src/services'),
  '@theme': path.resolve(__dirname, './src/theme'),
  '@pages': path.resolve(__dirname, './src/pages'),
  '@config': path.resolve(__dirname, './src/config'),
  '@auth': path.resolve(__dirname, './src/auth'),
  '@routing': path.resolve(__dirname, './src/routing'),
  '@layout': path.resolve(__dirname, './src/layout'),
  '@utils': path.resolve(__dirname, './src/utils'),
  '@types': path.resolve(__dirname, './src/types'),
};

export default defineConfig(({ mode }) => {
  // Load environment variables that start with VITE_ into process.env & import.meta.env
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react({
        // Enable fast refresh & JSX dev transforms (defaults, shown for clarity)
        jsxRuntime: 'automatic',
      }),
    ],
    resolve: {
      alias,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      coverage: {
        reporter: ['text', 'lcov'],
      },
    },
    server: {
      port: 5173,
      open: true, // Auto open browser for smoother DX
      strictPort: true, // Fail fast if port is taken (useful in CI)
    },
    preview: {
      port: 4173,
      strictPort: true,
    },
    build: {
      target: 'es2022',
      outDir: 'dist',
      sourcemap: mode !== 'production', // Helpful during development / staging
      emptyOutDir: true,
      // Future: Add chunk size warnings customization if bundle grows
    },
    esbuild: {
      target: 'es2022',
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@fluentui/react-components',
        '@azure/msal-browser',
        '@azure/msal-react',
      ],
    },
    define: {
      // Example of exposing selected values (avoid exposing secrets!)
      __APP_ENV__: JSON.stringify(mode),
      __AAD_REDIRECT_FALLBACK__: JSON.stringify(env.VITE_AAD_REDIRECT_URI || ''),
    },
  };
});
