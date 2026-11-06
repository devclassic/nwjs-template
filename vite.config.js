import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  plugins: [Vue()],
  base: './',
  server: {
    watch: {
      ignored: ['**/cache/**'],
    },
  },
  build: {
    outDir: 'build/ui',
    rolldownOptions: {
      external: Object.keys(pkg.dependencies ?? {}),
    },
  },
})
