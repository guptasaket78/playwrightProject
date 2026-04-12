/**
 * Test fixtures for Page Object Models
 * Provides initialized page objects to tests
 */
import { test as base, expect } from '@playwright/test';
import { BasePage, PlaywrightHomePage } from '../pages/index.js';

const test = base.extend({
  /**
   * Fixture for Playwright Home Page
   */
  playwrightHomePage: async ({ page }, use) => {
    const homePage = new PlaywrightHomePage(page);
    await use(homePage);
  },

  /**
   * Fixture for Base Page (generic page interactions)
   */
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});

export { test, expect };

