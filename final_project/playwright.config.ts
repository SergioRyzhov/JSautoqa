import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 3000,
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