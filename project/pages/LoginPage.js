class LoginPage {
  constructor(page) {
    this.page = page;
    this.elements = {
      signupLoginNavLink: page.getByRole('link', { name: 'Signup / Login' }),
      loggedInAsLabel: page.locator('a').filter({ hasText: 'Logged in as' }),
      logoutLink: page.getByRole('link', { name: 'Logout' }),
      deleteAccountLink: page.getByRole('link', { name: 'Delete Account' }),
      loginHeading: page.getByRole('heading', { name: 'Login to your account' }),
      signupHeading: page.getByRole('heading', { name: 'New User Signup!' }),
      loginEmailInput: page.locator('[data-qa="login-email"]'),
      loginPasswordInput: page.locator('[data-qa="login-password"]'),
      loginButton: page.locator('[data-qa="login-button"]'),
      loginErrorMessage: page.getByText('Your email or password is incorrect!'),
      signupNameInput: page.locator('[data-qa="signup-name"]'),
      signupEmailInput: page.locator('[data-qa="signup-email"]'),
      signupButton: page.locator('[data-qa="signup-button"]'),
      accountInfoHeading: page.getByRole('heading', {
        name: 'Enter Account Information',
      }),
      titleMrRadio: page.locator('#id_gender1'),
      passwordInput: page.locator('[data-qa="password"]'),
      daySelect: page.locator('[data-qa="days"]'),
      monthSelect: page.locator('[data-qa="months"]'),
      yearSelect: page.locator('[data-qa="years"]'),
      newsletterCheckbox: page.locator('#newsletter'),
      offersCheckbox: page.locator('#optin'),
      firstNameInput: page.locator('[data-qa="first_name"]'),
      lastNameInput: page.locator('[data-qa="last_name"]'),
      companyInput: page.locator('[data-qa="company"]'),
      address1Input: page.locator('[data-qa="address"]'),
      address2Input: page.locator('[data-qa="address2"]'),
      countrySelect: page.locator('[data-qa="country"]'),
      stateInput: page.locator('[data-qa="state"]'),
      cityInput: page.locator('[data-qa="city"]'),
      zipcodeInput: page.locator('[data-qa="zipcode"]'),
      mobileNumberInput: page.locator('[data-qa="mobile_number"]'),
      createAccountButton: page.locator('[data-qa="create-account"]'),
      accountCreatedHeading: page.locator('[data-qa="account-created"]'),
      continueButton: page.locator('[data-qa="continue-button"]'),
      accountDeletedHeading: page.locator('[data-qa="account-deleted"]'),
    };
  }
}

export default LoginPage;
