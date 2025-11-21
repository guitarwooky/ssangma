import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Polyfill process.env for the code usage
      'process.env': JSON.stringify(env),
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  }
})