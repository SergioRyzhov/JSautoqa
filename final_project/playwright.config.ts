import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
  testDir: './tests',
  expect: {
    timeout: 5000,
  },
  use: {
    viewport: { width: 1115, height: 1000 },
    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      args: ['--disable-popup-blocking']
    },
  },
};

export default config;