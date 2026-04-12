/**
 * Test utilities for common assertions and helpers
 */
import { expect } from '@playwright/test';

class TestUtils {
  /**
   * Verify element is visible
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   */
  static async assertElementVisible(page, selector) {
    await expect(page.locator(selector)).toBeVisible();
  }

  /**
   * Verify element has expected text
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {string} expectedText - Expected text content
   */
  static async assertElementHasText(page, selector, expectedText) {
    await expect(page.locator(selector)).toContainText(expectedText);
  }

  /**
   * Verify URL contains expected string
   * @param {Page} page - Playwright page object
   * @param {string} expectedURL - Expected URL substring
   */
  static async assertURLContains(page, expectedURL) {
    expect(page.url()).toContain(expectedURL);
  }

  /**
   * Wait for element count to match
   * @param {Page} page - Playwright page object
   * @param {string} selector - CSS selector
   * @param {number} expectedCount - Expected element count
   */
  static async assertElementCount(page, selector, expectedCount) {
    await expect(page.locator(selector)).toHaveCount(expectedCount);
  }

  /**
   * Generate random string
   * @param {number} length - String length
   * @returns {string} Random string
   */
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Get current timestamp
   * @returns {string} Timestamp
   */
  static getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Get random email
   * @returns {string} Random email
   */
  static generateRandomEmail() {
    return `test_${this.generateRandomString(5)}@example.com`;
  }

  /**
   * Delay execution
   * @param {number} ms - Milliseconds to delay
   */
  static async delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Retry a function multiple times
   * @param {Function} fn - Function to retry
   * @param {number} retries - Number of retries
   * @param {number} delay - Delay between retries in ms
   */
  static async retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(delay);
      }
    }
  }
}

export default TestUtils;
