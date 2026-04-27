import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' // Đảm bảo đường dẫn này đúng
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    crx({ manifest }), // Plugin này sẽ "đọc" manifest và lôi các file JS khác vào dist
    react({
      include: /\.(js|jsx|ts|tsx)$/,
      bundledDev: true,
    })
  ],
})