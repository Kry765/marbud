import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import compression from 'vite-plugin-compression'; // ✅ More reliable alternative

export default defineConfig({
  base: '/',
  plugins: [
    compression({ algorithm: 'gzip' }), // Works with Vite 4/5
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