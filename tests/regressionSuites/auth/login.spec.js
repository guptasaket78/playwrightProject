import { test, expect } from '../../../project/core/baseTest.js';
import {
  buildInvalidLoginUser,
  buildSignupUser,
} from '../../../project/config/testDataConfigReader.js';

test.describe('Automation Exercise login scenarios', () => {
  test('should log in with valid credentials after account creation', async ({
    app,
  }) => {
    const user = buildSignupUser();

    await app.actions.register.registerWithHappyPath(user);
    await app.actions.login.logout();
    await app.actions.login.login(user.email, user.password);

    await expect(app.pages.register.elements.loggedInAsLabel).toContainText(
      user.name
    );

    await app.actions.register.deleteAccount();
  });

  test('should show an error for invalid login credentials', async ({
    app,
  }) => {
    const invalidLoginUser = buildInvalidLoginUser();

    await app.actions.login.openLogin();
    await app.actions.login.login(
      invalidLoginUser.email,
      invalidLoginUser.password
    );

    await expect(app.pages.login.elements.loginErrorMessage).toBeVisible();
  });
});
