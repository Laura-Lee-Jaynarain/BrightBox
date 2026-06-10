import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/

/*export default defineConfig({
  server: {
    port: 5203,
    strictPort: true, // This stops it from switching to 5204/5205
  }
})*/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none'
    },
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7126',
        changeOrigin: true,
        secure: false
      }
    }
  }
})