import { test as base, expect } from '@playwright/test';
import TestContext from '../core/TestContext.js';

const test = base.extend({
  app: async ({ page }, use) => {
    await use(new TestContext(page));
  },
});

export { test, expect };
