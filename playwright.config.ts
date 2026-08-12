import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 300 * 1000,
  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',

  // running tests from the same file in parallel can cause shared-state
  // and resource-pressure issues in CI. Disable fullyParallel to improve
  // stability when running the whole suite together.
  fullyParallel: false,

  retries: process.env.CI ? 2 : 0,

  // Reduce the number of workers in CI to avoid resource exhaustion
  // which can cause context teardown to hang and exceed timeouts.
  workers: process.env.CI ? 2 : undefined,

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: true,
        // keep traces/videos/screenshots lighter in CI to reduce IO and
        // teardown delays; keep verbose artifacts locally for debugging
        trace: process.env.CI ? 'on-first-retry' : 'on',
        screenshot: process.env.CI ? 'only-on-failure' : 'on',
        viewport: { width: 1920, height: 1080 },
        video: process.env.CI ? 'off' : 'on'
       },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        trace: process.env.CI ? 'on-first-retry' : 'on',
        screenshot: process.env.CI ? 'only-on-failure' : 'on',
        viewport: { width: 1920, height: 1080 },
        video: process.env.CI ? 'off' : 'on'
       },
    }
  ],
});
