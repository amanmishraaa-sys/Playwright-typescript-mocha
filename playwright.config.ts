import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  timeout: 180 * 1000,
  expect: {
    timeout: 6 * 1000,
  },

  reporter: "html",

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 2 : undefined,

  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: false,
        trace: process.env.CI ? "on-first-retry" : "on",
        screenshot: process.env.CI ? "only-on-failure" : "on",
        viewport: { width: 1920, height: 1080 },
        video: process.env.CI ? "off" : "on",
      },
    },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //     headless: true,
    //     trace: process.env.CI ? "on-first-retry" : "on",
    //     screenshot: process.env.CI ? "only-on-failure" : "on",
    //     viewport: { width: 1920, height: 1080 },
    //     video: process.env.CI ? "off" : "on",
    //   },
    // },
  ],
});
