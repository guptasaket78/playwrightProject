# POM Framework Documentation

## Overview
This is a comprehensive Page Object Model (POM) framework for Playwright JS automation testing. The POM pattern separates test logic from page-specific details, making tests more maintainable and reusable.

## Project Structure

```
tests/
├── pages/                    # Page Object Models
│   ├── BasePage.js          # Base class with common methods
│   ├── PlaywrightHomePage.js # Example page object
│   └── index.js             # Exports all page objects
├── fixtures/                # Test fixtures
│   └── pageFixtures.js      # Page object fixtures for tests
├── utils/                   # Test utilities and helpers
│   └── TestUtils.js         # Common test utilities
├── pom.spec.js             # Example tests using POM pattern
└── example.spec.js         # Original example tests
```

## Key Components

### 1. BasePage.js
Base class that all page objects inherit from. Provides common methods:

- **Navigation**: `goto()`, `goBack()`, `goForward()`, `reload()`
- **Element Interaction**: `click()`, `fill()`, `check()`, `uncheck()`, `selectOption()`
- **Element Queries**: `getText()`, `getAttribute()`, `isVisible()`, `elementExists()`, `getElementCount()`
- **Waits**: `waitForElement()`, `waitForURL()`
- **Utilities**: `takeScreenshot()`, `scrollToElement()`, `clearInput()`, `executeScript()`

### 2. PlaywrightHomePage.js
Example page object inheriting from BasePage. Shows how to:

- Define page-specific locators
- Create methods for page-specific interactions
- Use inherited BasePage methods
- Encapsulate page logic

### 3. pageFixtures.js
Playwright test fixtures that:

- Initialize page objects automatically
- Provide page objects to tests via fixture injection
- Reduce boilerplate in test files

### 4. TestUtils.js
Utility class with helpers for:

- Custom assertions
- Data generation (random strings, emails)
- Test delays and retries
- Timestamp generation

## How to Use

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test tests/pom.spec.js

# Run with headed browser
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run on specific browser
npx playwright test --project=chromium
```

### Creating a New Page Object

1. **Create a new file** in `tests/pages/` (e.g., `LoginPage.js`):

```javascript
import BasePage from './BasePage.js';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com/login';
    
    // Define locators
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button:has-text("Login")';
  }

  async navigateToLogin() {
    await this.goto(this.url);
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async isLoginButtonVisible() {
    return this.isVisible(this.loginButton);
  }
}

export default LoginPage;
```

2. **Add to exports** in `tests/pages/index.js`:

```javascript
import LoginPage from './LoginPage.js';

export { BasePage, PlaywrightHomePage, LoginPage };
```

3. **Add fixture** in `tests/fixtures/pageFixtures.js`:

```javascript
const test = base.extend({
  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await use(login);
  },
});
```

4. **Use in test** in `tests/your-test.spec.js`:

```javascript
import test, { expect } from '../fixtures/pageFixtures.js';

test('should login successfully', async ({ loginPage }) => {
  await loginPage.navigateToLogin();
  await loginPage.login('user@example.com', 'password123');
  // Add assertions...
});
```

## Best Practices

### 1. Locator Management
- Define all locators as class properties
- Use meaningful names for locators
- Prefer role-based selectors: `page.getByRole()`, `page.getByLabel()`
- Update locators when UI changes

```javascript
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
  }
}
```

### 2. Method Naming
- Use clear, action-based method names
- Start with verbs: `click`, `fill`, `verify`, `get`, `navigate`
- Example: `fillLoginForm()`, `submitForm()`, `verifyErrorMessage()`

### 3. One Page Object Per Page
- Create a separate page object for each unique page/feature
- Don't mix unrelated functionality
- Reuse common methods from BasePage

### 4. Test Organization
- Use `test.describe()` for grouping related tests
- Include `beforeEach()` for setup
- Include `afterEach()` for cleanup
- Make tests independent and rerunnable

### 5. Error Handling
Use utilities for robust testing:

```javascript
// Retry logic
await TestUtils.retry(async () => {
  await page.click('.element');
}, 3, 1000);

// Wait with delay
await TestUtils.delay(2000);
```

## Advanced Features

### Custom Assertions with TestUtils

```javascript
import TestUtils from '../utils/TestUtils.js';

// Assert element text
await TestUtils.assertElementHasText(page, '.message', 'Success');

// Assert URL
await TestUtils.assertURLContains(page, '/dashboard');

// Assert element count
await TestUtils.assertElementCount(page, 'li', 5);
```

### Generate Test Data

```javascript
const randomString = TestUtils.generateRandomString(10);
const randomEmail = TestUtils.generateRandomEmail();
const timestamp = TestUtils.getTimestamp();
```

## Configuration

Edit `playwright.config.js` to customize:

- **Base URL**: Set in `use: { baseURL: 'http://localhost:3000' }`
- **Timeouts**: Set global and per-test timeouts
- **Browsers**: Configure which browsers to test
- **Reporters**: HTML, JSON, JUnit reports
- **Retries**: Auto-retry failed tests on CI

Example configuration for baseURL:

```javascript
use: {
  baseURL: 'http://localhost:3000',
  trace: 'on-first-retry',
},
```

Then use relative URLs in page objects:

```javascript
await this.goto('/dashboard'); // Goes to http://localhost:3000/dashboard
```

## Tips & Tricks

1. **Use Locator Chains**: Build complex selectors step by step
```javascript
const element = this.page.locator('form').locator('input[type="email"]');
```

2. **Wait for Navigation**: Use `waitForURL()` after actions that navigate
```javascript
await this.click(this.loginButton);
await this.waitForURL('/dashboard');
```

3. **Screenshot on Failure**: Playwright captures screenshots automatically on failure
```javascript
await this.takeScreenshot('./failures/debug.png');
```

4. **Debug Mode**: Run tests in debug mode to inspect elements
```bash
npx playwright test --debug
```

5. **Parallel Testing**: Tests run in parallel by default for speed
```bash
npx playwright test --workers=4
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-page)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Best Practices](https://playwright.dev/docs/best-practices)

## Common Issues & Solutions

### Issue: Locators not finding elements
- Use `page.pause()` to debug
- Check if element is inside shadow DOM
- Wait for element before interacting: `waitForElement()`

### Issue: Flaky tests
- Use explicit waits instead of hardcoded delays
- Wait for specific conditions before assertions
- Use retry logic for unreliable operations

### Issue: Tests running too slowly
- Enable parallel execution
- Use headless mode (default)
- Minimize use of `delay()`

---

**Happy Testing!** 🎭
