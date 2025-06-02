import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    allowedHosts: ['fb7d-43-250-156-199.ngrok-free.app','8ceb-43-250-156-199.ngrok-free.app','127.0.0.1:8000'],
  },
})
