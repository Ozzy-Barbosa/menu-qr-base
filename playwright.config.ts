import { defineConfig } from '@playwright/test';
import business from './src/data/business.json' with { type: 'json' };
const localURL = `http://127.0.0.1:4321${new URL(business.url).pathname}`;
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  webServer: process.env.TEST_URL ? undefined : {
    command: 'npm run preview -- --port 4321',
    url: localURL,
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: '1' },
  },
  reporter: [['list'], ['json', { outputFile: 'evidence/browser-results.json' }]],
  use: {
    baseURL: process.env.TEST_URL || localURL,
    headless: true,
    viewport: { width: 1440, height: 1000 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
