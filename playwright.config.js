// @ts-check
import { defineConfig, devices } from '@playwright/test';
import {
  environmentBaseUrls,
  selectedEnvironment,
} from './project/config/envConfig.js';
import {
  browserName,
  isHeadless,
  runMode,
} from './project/config/testDataConfigReader.js';

const baseURL = environmentBaseUrls[selectedEnvironment];

if (!baseURL) {
  throw new Error(
    `Unsupported test environment "${selectedEnvironment}". Update project/config/testRunConfig.js.`
  );
}

if (!['head', 'headless'].includes(runMode)) {
  throw new Error(
    `Unsupported runMode "${runMode}". Use "head" or "headless" in project/testDataConfig.json.`
  );
}

if (!['chromium', 'firefox', 'webkit'].includes(browserName)) {
  throw new Error(
    `Unsupported browserName "${browserName}". Use "chromium", "firefox", or "webkit" in project/testDataConfig.json.`
  );
}

const allProjects = [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: ['regressionSuites/**/*.spec.js', 'smoke/**/*.spec.js'],
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    headless: isHeadless,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: allProjects.filter((project) => project.name === browserName),

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
