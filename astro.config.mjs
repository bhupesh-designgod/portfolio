// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Update this when you know the deployed URL — it powers canonical links.
  site: 'https://example.com',

  /* Every page still prerenders. The adapter is here for exactly one route —
     /api/chat opts into serverless with `export const prerender = false`, so
     the API key stays server-side and nothing else changes shape. */
  output: 'static',
  adapter: vercel(),
});
