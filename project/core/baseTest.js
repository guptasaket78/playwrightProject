import { test as base, expect } from '../fixtures/app.fixture.js';
import { selectedEnvironment } from '../config/envConfig.js';

const test = base;

test.beforeAll(async () => {
  console.log(`Running tests against "${selectedEnvironment}" environment.`);
});

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
});

export { test, expect };
