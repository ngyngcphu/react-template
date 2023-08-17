import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true
  },
  build: {
    chunkSizeWarningLimit: 2000
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks')
      },
      {
        find: '@interfaces',
        replacement: path.resolve(__dirname, 'src/interfaces')
      },
      {
        find: '@layouts',
        replacement: path.resolve(__dirname, 'src/layouts')
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services')
      },
      {
        find: '@states',
        replacement: path.resolve(__dirname, 'src/states')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      }
    ]
  }
});
