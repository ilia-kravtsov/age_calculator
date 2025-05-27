import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/age_calculator/',
  plugins: [react()],
  server: {
    open: true,
  },
})
