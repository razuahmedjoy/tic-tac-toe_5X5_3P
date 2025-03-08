import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist", // Ensure the output folder is correct
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://tic-tac-toe-5-x5-3-p.vercel.app',
        changeOrigin: true,
      }
    }
  }
})
