import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Update this to match your EXACT repository name
  base: '/Datexia-Lurnex-LMS/v2/', // v1 (classic) is built from tag v1.0.0 into the site root; see deploy.yml
  // ponytail: Firebase SDK is ~75% of the bundle; lazy-import it after first paint if load time matters.
  build: { chunkSizeWarningLimit: 800 },
})
