import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': '/src',
    },
  },
  server: {
    port: 8010,
    proxy: {
      '/api/v1': {
        target: 'http://example.front.ylab.io',
        changeOrigin: true,
      },
    },
  },
});
