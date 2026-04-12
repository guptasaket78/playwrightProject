/**
 * Example test file using the POM framework
 * Demonstrates how to use page objects in tests
 */
import { test, expect } from './fixtures/pageFixtures.js';
import TestUtils from './utils/TestUtils.js';

test.describe('Playwright Home Page - POM Framework Examples', () => {
  test.beforeEach(async ({ playwrightHomePage }) => {
    // Navigate to the home page before each test
    await playwrightHomePage.navigateToHome();
  });

  test('should display page title correctly', async ({ playwrightHomePage }) => {
    const titleIsCorrect = await playwrightHomePage.verifyPageTitle();
    expect(titleIsCorrect).toBeTruthy();
  });

  test('should verify navigation menu is visible', async ({ playwrightHomePage }) => {
    const isVisible = await playwrightHomePage.isNavigationMenuVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should click get started link and verify page loads', async ({
    playwrightHomePage,
  }) => {
    await playwrightHomePage.clickGetStartedLink();

    // Wait for navigation to complete
    await TestUtils.delay(1000);

    const heading = await playwrightHomePage.getPageHeading();
    expect(heading).toBeTruthy();
  });

  test('should get all navigation links', async ({ playwrightHomePage }) => {
    const links = await playwrightHomePage.getNavigationLinks();
    expect(links.length).toBeGreaterThan(0);
  });

  test('should verify page URL is correct', async ({ playwrightHomePage }) => {
    const url = await playwrightHomePage.getCurrentURL();
    expect(url).toContain('playwright.dev');
  });

  test('should take screenshot of home page', async ({ playwrightHomePage }) => {
    const timestamp = TestUtils.getTimestamp().replace(/[:.]/g, '-');
    const screenshotPath = `./test-results/playwright-home-${timestamp}.png`;
    await playwrightHomePage.takeScreenshot(screenshotPath);

    // Verify screenshot was created (optional)
    const { existsSync } = await import('fs');
    expect(existsSync(screenshotPath)).toBeTruthy();
  });

  test('should verify page title contains Playwright', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('Playwright');
  });
});

test.describe('Generic Page Interactions - BasePage Examples', () => {
  test('should navigate and verify URL', async ({ basePage }) => {
    await basePage.goto('https://playwright.dev/');
    const url = await basePage.getCurrentURL();
    expect(url).toContain('playwright.dev');
  });

  test('should get page title', async ({ basePage }) => {
    await basePage.goto('https://playwright.dev/');
    const title = await basePage.getPageTitle();
    expect(title).toBeTruthy();
  });

  test('should reload page', async ({ basePage }) => {
    await basePage.goto('https://playwright.dev/');
    const urlBefore = await basePage.getCurrentURL();
    await basePage.reload();
    const urlAfter = await basePage.getCurrentURL();
    expect(urlAfter).toBe(urlBefore);
  });
});
