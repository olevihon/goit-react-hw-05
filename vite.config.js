import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@root': path.resolve(__dirname, './src'),
      // eslint-disable-next-line no-undef
      '@pages': path.resolve(__dirname, './src/pages'),
      // eslint-disable-next-line no-undef
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
});
