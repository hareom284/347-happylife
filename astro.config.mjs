// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://347awakening.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
