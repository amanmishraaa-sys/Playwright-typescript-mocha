import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 180 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  reporter: 'html',

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0, 

  workers: process.env.CI ? 6 : 6, 

  projects: [
    {
      name: 'chromium',
      use: { 
        browserName: 'chromium',
        headless: false,
        trace: 'on',
        screenshot: 'on',
        viewport: {width:1920, height: 1080},
        video: 'on'
       },
    }
  ],
});
