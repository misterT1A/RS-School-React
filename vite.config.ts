import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@/Assets', replacement: '/src/Assets' },
      { find: '@/Components', replacement: '/src/Components' },
    ],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "./src/styles/_vars.scss";
        @import "./src/styles/_mixins.scss";
        @import "./src/styles/_globals.scss";
        `,
      },
    },
  },
});
