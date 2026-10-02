import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
const business = JSON.parse(readFileSync(new URL('./src/data/business.json', import.meta.url), 'utf8'));
const url = new URL(business.url);
export default defineConfig({
  site: url.origin,
  base: url.pathname.replace(/\/$/, '') || '/',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
