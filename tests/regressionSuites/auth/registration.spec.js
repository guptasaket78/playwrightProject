import { test, expect } from '../../../project/core/baseTest.js';
import { buildSignupUser } from '../../../project/config/testDataConfigReader.js';

test.describe('Automation Exercise registration scenarios', () => {
  test('should sign up a new user and then delete the account', async ({
    app,
  }) => {
    const user = buildSignupUser();

    await app.actions.register.registerWithHappyPath(user);

    await expect(app.pages.register.elements.loggedInAsLabel).toContainText(user.name);

    await app.actions.register.deleteAccount();

    await expect(app.pages.register.elements.accountDeletedHeading).toBeVisible();
  });

  test('should create an account and allow logout and login with the same credentials', async ({
    app,
  }) => {
    const user = buildSignupUser();

    await app.actions.register.registerWithHappyPath(user);
    await app.actions.login.logout();
    await app.actions.login.login(user.email, user.password);

    await expect(app.pages.register.elements.loggedInAsLabel).toContainText(user.name);

    await app.actions.register.deleteAccount();
  });
});
