import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // If API_KEY is missing, default to empty string to prevent crash on undefined access
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  }
})