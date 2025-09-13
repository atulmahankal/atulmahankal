import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import path from 'path';

// Equivalent of __dirname in ESM
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const baseURL = "/atulmahankal"
const names = [
  '/',
  '/aboutme',
  '/experience',
  '/projects',
  '/applications',
  '/photography',
  '/contact',
]
const dynamicRoutes = names.map(name => `${baseURL}${name}`)

// https://vitejs.dev/config/
export default defineConfig({
  base: baseURL, // Set the base for subdirectory
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://atulmahankal.github.io/atulmahankal',
      dynamicRoutes,              // only include these
      outDir: 'dist',             // sitemap in dist
      readable: true,             // pretty format (optional)
      autoLastmod: true,          // auto lastmod
      // 👇 prevent plugin from scanning repo automatically
      extensions: [],             // don’t look for .html/.vue/.jsx files
      exclude: [
        // '/bs-dashboard',          // explicitly exclude
        '/',                      // exclude root if you don’t want it
      ],
      robots: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/private/'],
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
