import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['allure-playwright'],
  ],
  workers: 7,
  testDir: './tests',
  timeout: 240000,
  expect: {
    timeout: 60000,
  },
  // fullyParallel: true,
  use: {
    viewport: { width: 1280, height: 900 },
    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    headless: false,
    screenshot: 'off',
    trace: 'off',
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },
};

export default config;