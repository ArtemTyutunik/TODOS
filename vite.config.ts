import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@entities': path.resolve(__dirname, './src/entities'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  plugins: [react()],
});
