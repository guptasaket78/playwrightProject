/**
 * PlaywrightHomePage - Page Object for Playwright documentation home page
 * Inherits from BasePage and defines locators and methods specific to this page
 */
import BasePage from './BasePage.js';

class PlaywrightHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://playwright.dev/';

    // Locators (CSS selectors, XPath, or Playwright selectors)
    this.getStartedLink = 'a:has-text("Get started")';
    this.pageTitle = 'h1';
    this.navigationMenu = 'nav';
    this.searchButton = '[aria-label="Search"]';
  }

  /**
   * Navigate to Playwright home page
   */
  async navigateToHome() {
    await this.goto(this.url);
  }

  /**
   * Verify page title contains expected text
   */
  async verifyPageTitle() {
    const title = await this.getPageTitle();
    return title.includes('Playwright');
  }

  /**
   * Click on "Get Started" link
   */
  async clickGetStartedLink() {
    await this.page.getByRole('link', { name: 'Get started' }).click();
  }

  /**
   * Get page heading text
   */
  async getPageHeading() {
    const heading = this.page.getByRole('heading', { name: 'Installation' });
    return heading.isVisible();
  }

  /**
   * Verify navigation menu is visible
   */
  async isNavigationMenuVisible() {
    return this.isVisible(this.navigationMenu);
  }

  /**
   * Get all navigation links
   */
  async getNavigationLinks() {
    return this.getAllText(`${this.navigationMenu} a`);
  }

  /**
   * Click search button
   */
  async clickSearchButton() {
    await this.click(this.searchButton);
  }
}

export default PlaywrightHomePage;
