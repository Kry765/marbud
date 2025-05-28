import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression';
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: '/',
  plugins: [
    compression({ algorithm: 'gzip' }), 
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': {},
  },
  server: {
    port: 5174,
    host: true
  }
});