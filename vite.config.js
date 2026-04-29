import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This base path must match your GitHub repository name exactly.
  // If your repo is named 'mastery-roadmap', keep it like this:
  base: '/mastery-roadmap/', 
})
