const { defineConfig } = require('@playwright/test');
if (process.platform === 'win32') process.env.Path = `${process.env.Path};${process.env.SystemRoot}\\System32`;
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  workers: 2,
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'chrome', headless: true, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
  ],
  webServer: { command: 'node server.cjs', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }
});
