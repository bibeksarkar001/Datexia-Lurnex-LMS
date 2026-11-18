import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Update this to match your EXACT repository name
  base: '/Datexia-Lurnex-LMS/v3/', // v1 (tag v1.0.0) serves at the root and v2 (tag v2.0.0) at /v2/; see deploy.yml
  // ponytail: Firebase SDK is ~75% of the bundle; lazy-import it after first paint if load time matters.
  build: { chunkSizeWarningLimit: 800 },
})
