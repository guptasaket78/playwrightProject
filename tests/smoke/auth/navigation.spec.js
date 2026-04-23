import { test, expect } from '../../../project/core/baseTest.js';

test.describe('Automation Exercise smoke checks', () => {
  test('loads the login screen from the home page', async ({ app }) => {
    await app.actions.login.openHomeAndNavigateToLogin();

    await expect(app.pages.login.elements.loginHeading).toBeVisible();
    await expect(app.pages.login.elements.signupHeading).toBeVisible();
  });
});
