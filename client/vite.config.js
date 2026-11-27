import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensure this is a single slash
  build: {
    outDir: 'dist',
    // This forces Vite to inline all assets or use relative paths
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined, // Prevents splitting pages into separate files
      },
    },
  },
})