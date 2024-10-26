import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config();


const apiUrl = process.env.REACT_APP_BACKEND_URL;

export default defineConfig({
  plugins: [react()],
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