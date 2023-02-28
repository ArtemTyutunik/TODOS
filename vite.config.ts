import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './features/app'),
      '@layouts': path.resolve(__dirname, './layouts/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  plugins: [react()],
});
