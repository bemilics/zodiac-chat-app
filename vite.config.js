import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy para las llamadas a /api durante desarrollo
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  },
  optimizeDeps: {
    include: ['circular-natal-horoscope-js'],
    esbuildOptions: {
      resolveExtensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json']
    }
  },
  resolve: {
    alias: {
      'circular-natal-horoscope-js': 'circular-natal-horoscope-js/dist/index.js'
    }
  }
})
