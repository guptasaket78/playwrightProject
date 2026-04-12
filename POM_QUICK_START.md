# POM Framework - Quick Start Guide

## ✅ Framework Successfully Created!

Your Playwright QA Automation POM framework is ready to use. All 30 tests passed successfully across chromium, firefox, and webkit browsers.

---

## 📁 Project Structure

```
tests/
├── pages/                          # Page Object Models
│   ├── BasePage.js                # Base class with 20+ common methods
│   ├── PlaywrightHomePage.js      # Example page object
│   └── index.js                    # Export all page objects
├── fixtures/
│   └── pageFixtures.js            # Custom test fixtures
├── utils/
│   └── TestUtils.js               # 10+ utility functions
├── pom.spec.js                    # Example POM tests (30 tests ✅)
├── example.spec.js                # Original tests
└── POM_FRAMEWORK_README.md        # Detailed documentation
```

---

## 🚀 Quick Commands

```bash
# Run all tests
npm test

# Run with headed browser (see it run)
npm test:headed

# Run in debug mode (interactive debugging)
npm test:debug

# Run with UI mode (visual test runner)
npm test:ui

# View HTML report
npm test:report
```

---

## 📝 Create Your First Page Object

**1. Create `tests/pages/LoginPage.js`:**
```javascript
import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com/login';
    this.emailInput = '[data-testid="email"]';
    this.passwordInput = '[data-testid="password"]';
    this.loginButton = 'button:has-text("Login")';
  }

  async navigateToLogin() {
    await this.goto(this.url);
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async verifyLoginSuccess() {
    return this.waitForURL('/dashboard');
  }
}

export default LoginPage;
```

**2. Update `tests/pages/index.js`:**
```javascript
import BasePage from './BasePage.js';
import PlaywrightHomePage from './PlaywrightHomePage.js';
import LoginPage from './LoginPage.js';

export { BasePage, PlaywrightHomePage, LoginPage };
```

**3. Update `tests/fixtures/pageFixtures.js`:**
```javascript
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },
  // ... other fixtures
});
```

**4. Create `tests/login.spec.js`:**
```javascript
import { test, expect } from './fixtures/pageFixtures.js';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ loginPage }) => {
    await loginPage.navigateToLogin();
    await loginPage.login('user@example.com', 'password123');
    await loginPage.verifyLoginSuccess();
  });
});
```

---

## 🎯 BasePage - Available Methods

All page objects inherit these 20+ methods:

**Navigation:**
- `goto(url)` - Navigate to URL
- `getCurrentURL()` - Get current URL
- `goBack()`, `goForward()`, `reload()`

**Element Interaction:**
- `click(selector)` - Click element
- `fill(selector, text)` - Type text
- `check(selector)`, `uncheck(selector)` - Checkboxes
- `selectOption(selector, option)` - Dropdowns
- `clearInput(selector)` - Clear text field

**Element Queries:**
- `getText(selector)` - Get text content
- `getAttribute(selector, attr)` - Get attribute
- `isVisible(selector)` - Check visibility
- `elementExists(selector)` - Element exists?
- `getElementCount(selector)` - Count elements
- `getAllText(selector)` - Get all text

**Waits:**
- `waitForElement(selector)` - Wait for element
- `waitForURL(url)` - Wait for URL change

**Utilities:**
- `takeScreenshot(path)` - Take screenshot
- `scrollToElement(selector)` - Scroll to element
- `executeScript(script, arg)` - Run JavaScript

---

## 🛠️ TestUtils - Available Helpers

```javascript
import TestUtils from './utils/TestUtils.js';

// Assertions
TestUtils.assertElementVisible(page, '.message');
TestUtils.assertElementHasText(page, '.title', 'Welcome');
TestUtils.assertURLContains(page, '/dashboard');
TestUtils.assertElementCount(page, 'li', 5);

// Data Generation
TestUtils.generateRandomString(10);      // "AbC1234xyZ"
TestUtils.generateRandomEmail();         // "test_abc12@example.com"
TestUtils.getTimestamp();                // "2026-04-12T02:23:16.720Z"

// Timing
await TestUtils.delay(2000);             // Wait 2 seconds

// Retry Logic
await TestUtils.retry(async () => {
  await page.click('.element');
}, 3, 1000);                             // Retry 3 times, 1s delay
```

---

## 📊 Test Results

✅ **30 tests passed** (37.4 seconds)
- 10 tests per browser (chromium, firefox, webkit)
- No failures, no skipped tests

---

## 📚 Documentation

For detailed information, see **`tests/POM_FRAMEWORK_README.md`**

Topics covered:
- Complete method references
- Best practices for POM
- Configuration options
- Troubleshooting guide
- Advanced features

---

## 💡 Key Benefits of POM Framework

1. **Maintainability** - Change locators in one place
2. **Reusability** - Share page objects across tests
3. **Readability** - Tests read like business logic
4. **Scalability** - Easy to add new pages
5. **Reliability** - Built-in waits and error handling

---

## 🎓 Next Steps

1. ✅ Review `tests/pom.spec.js` to see examples
2. ✅ Create your first page object
3. ✅ Write tests using the fixtures
4. ✅ Run tests with `npm test`
5. ✅ View results in HTML report

---

Happy Testing! 🎭
