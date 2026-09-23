/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'as-logo.ico',
          'as-logo-16x16.png',
          'as-logo-32x32.png',
          'as-logo-48x48.png',
          'as-logo-64x64.png',
          'as-logo-128x128.png',
          'as-logo-192x192.png',
          'as-logo-256x256.png',
          'as-logo-512x512.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'header.png'
        ],
        manifest: {
          name: 'Aarti Sangrah',
          short_name: 'Aarti',
          description: 'A beautiful app for discovering and singing Indian devotional Aartis.',
          theme_color: '#fdfbf7',
          background_color: '#fdfbf7',
          icons: [
            {
              src: 'as-logo-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'as-logo-256x256.png',
              sizes: '256x256',
              type: 'image/png'
            },
            {
              src: 'as-logo-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'as-logo-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    test: {
      environment: 'jsdom',
    },
  };
});
