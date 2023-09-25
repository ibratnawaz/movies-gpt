import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': loadEnv('production', process.cwd(), '')
  },
  test: {
    environment: 'happy-dom'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
