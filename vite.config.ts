import {defineConfig, PluginOption} from 'vite';
import {visualizer} from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  plugins: [
    react(),
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html', // will be saved in project's root
    }) as PluginOption,
  ],
});
