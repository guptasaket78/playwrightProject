/**
 * BasePage - Base class for all Page Objects
 * Provides common methods for page interactions, waits, and navigation
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param {string} url - URL to navigate to
   */
  async goto(url) {
    await this.page.goto(url);
  }

  /**
   * Get the current URL
   * @returns {string} Current page URL
   */
  async getCurrentURL() {
    return this.page.url();
  }

  /**
   * Get page title
   * @returns {string} Page title
   */
  async getPageTitle() {
    return this.page.title();
  }

  /**
   * Click an element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill a text input
   * @param {string} selector - CSS selector
   * @param {string} text - Text to fill
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content from an element
   * @param {string} selector - CSS selector
   * @returns {string} Text content
   */
  async getText(selector) {
    return this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   * @param {string} selector - CSS selector
   * @returns {boolean} True if element is visible
   */
  async isVisible(selector) {
    return this.page.isVisible(selector);
  }

  /**
   * Wait for element to be visible
   * @param {string} selector - CSS selector
   * @param {number} timeout - Max wait time in ms
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Press a key
   * @param {string} key - Key name
   */
  async pressKey(key) {
    await this.page.press('body', key);
  }

  /**
   * Reload page
   */
  async reload() {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack() {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward() {
    await this.page.goForward();
  }

  /**
   * Take screenshot
   * @param {string} path - File path for screenshot
   */
  async takeScreenshot(path) {
    await this.page.screenshot({ path });
  }

  /**
   * Wait for URL to match
   * @param {string|RegExp} urlOrPredicate - URL or regex pattern
   */
  async waitForURL(urlOrPredicate) {
    await this.page.waitForURL(urlOrPredicate);
  }

  /**
   * Check if element exists
   * @param {string} selector - CSS selector
   * @returns {boolean} True if element exists
   */
  async elementExists(selector) {
    const element = await this.page.$(selector);
    return element !== null;
  }

  /**
   * Get element count
   * @param {string} selector - CSS selector
   * @returns {number} Number of elements matching selector
   */
  async getElementCount(selector) {
    return this.page.$$eval(selector, (elements) => elements.length);
  }

  /**
   * Execute JavaScript on the page
   * @param {string} script - JavaScript code to execute
   * @param {*} arg - Arguments to pass to script
   * @returns {*} Result of script execution
   */
  async executeScript(script, arg = null) {
    return this.page.evaluate(script, arg);
  }

  /**
   * Scroll to element
   * @param {string} selector - CSS selector
   */
  async scrollToElement(selector) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Clear input field
   * @param {string} selector - CSS selector
   */
  async clearInput(selector) {
    await this.page.fill(selector, '');
  }

  /**
   * Get attribute value
   * @param {string} selector - CSS selector
   * @param {string} attribute - Attribute name
   * @returns {string} Attribute value
   */
  async getAttribute(selector, attribute) {
    return this.page.getAttribute(selector, attribute);
  }

  /**
   * Select option from dropdown
   * @param {string} selector - CSS selector
   * @param {string|{value: string}|{label: string}|{index: number}} option - Option to select
   */
  async selectOption(selector, option) {
    await this.page.selectOption(selector, option);
  }

  /**
   * Check a checkbox
   * @param {string} selector - CSS selector
   */
  async check(selector) {
    await this.page.check(selector);
  }

  /**
   * Uncheck a checkbox
   * @param {string} selector - CSS selector
   */
  async uncheck(selector) {
    await this.page.uncheck(selector);
  }

  /**
   * Get all text content from elements
   * @param {string} selector - CSS selector
   * @returns {Array<string>} Array of text contents
   */
  async getAllText(selector) {
    return this.page.$$eval(selector, (elements) =>
      elements.map((el) => el.textContent.trim())
    );
  }
}

export default BasePage;
