import { PlaywrightTestConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    viewport: { width: 1115, height: 1000 },
    baseURL: process.env.BASE_URL,
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on',
  },
};

export default config;