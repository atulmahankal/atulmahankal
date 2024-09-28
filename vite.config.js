import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import path from 'path';

const names = [
  '/aboutme',
  '/experience',
  '/projects',
  '/applications',
  '/photography',
  '/contact',
]
const dynamicRoutes = names;  //.map(name => `/names/${name}`)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://atulmahankal.github.io/atulmahankal/',
      dynamicRoutes,
      robots:[{
        userAgent: '*',
        allow: '/',
      }]
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
})
