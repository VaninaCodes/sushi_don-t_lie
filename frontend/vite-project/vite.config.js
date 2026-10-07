// Integra el plugin oficial de Tailwind CSS v4 con Vite

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Plugin de Tailwind CSS v4
  ],
  server: {
    port: 5173
  }
});