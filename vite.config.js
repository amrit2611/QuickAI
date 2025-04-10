import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'
import path from "path"

dotenv.config();


const apiUrl = process.env.VITE_BASE_API_URL;


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: true,
      },
    },
  },
});