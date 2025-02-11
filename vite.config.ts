import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 5174, // ✅ 指定 Vite 開發伺服器的端口號
    strictPort: true, // ✅ 如果 5174 被占用，不要隨機選擇其他端口
    host: 'localhost', // 或 "0.0.0.0" 允許外部訪問
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
