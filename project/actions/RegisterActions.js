import RegisterPage from '../pages/RegisterPage.js';
import LoginActions from './LoginActions.js';

class RegisterActions {
  constructor(
    page,
    registerPage = new RegisterPage(page),
    loginActions = null
  ) {
    this.page = page;
    this.registerPage = registerPage;
    this.login = loginActions || new LoginActions(page);
  }

  async waitForLoginPage() {
    await this.registerPage.elements.loginHeading.waitFor();
    await this.registerPage.elements.signupHeading.waitFor();
  }

  async waitForLoggedInState() {
    await this.registerPage.elements.loggedInAsLabel.waitFor();
  }

  async waitForAccountDeleted() {
    await this.registerPage.elements.accountDeletedHeading.waitFor();
  }

  async submitSignupIdentity(user) {
    await this.waitForLoginPage();
    await this.registerPage.elements.signupNameInput.fill(user.name);
    await this.registerPage.elements.signupEmailInput.fill(user.email);
    await this.registerPage.elements.signupButton.click();
    await this.registerPage.elements.accountInfoHeading.waitFor();
  }

  async fillAccountInformation(user) {
    await this.registerPage.elements.titleMrRadio.check();
    await this.registerPage.elements.passwordInput.fill(user.password);
    await this.registerPage.elements.daySelect.selectOption(user.day);
    await this.registerPage.elements.monthSelect.selectOption(user.month);
    await this.registerPage.elements.yearSelect.selectOption(user.year);
    await this.registerPage.elements.newsletterCheckbox.check();
    await this.registerPage.elements.offersCheckbox.check();
  }

  async fillAddressInformation(user) {
    await this.registerPage.elements.firstNameInput.fill(user.firstName);
    await this.registerPage.elements.lastNameInput.fill(user.lastName);
    await this.registerPage.elements.companyInput.fill(user.company);
    await this.registerPage.elements.address1Input.fill(user.address1);
    await this.registerPage.elements.address2Input.fill(user.address2);
    await this.registerPage.elements.countrySelect.selectOption(user.country);
    await this.registerPage.elements.stateInput.fill(user.state);
    await this.registerPage.elements.cityInput.fill(user.city);
    await this.registerPage.elements.zipcodeInput.fill(user.zipcode);
    await this.registerPage.elements.mobileNumberInput.fill(user.mobileNumber);
  }

  async submitAccountCreation() {
    await this.registerPage.elements.createAccountButton.click();
    await this.registerPage.elements.accountCreatedHeading.waitFor();
    await this.registerPage.elements.continueButton.click();
    await this.waitForLoggedInState();
  }

  async registerWithHappyPath(user) {
    await this.login.openLogin();
    await this.submitSignupIdentity(user);
    await this.fillAccountInformation(user);
    await this.fillAddressInformation(user);
    await this.submitAccountCreation();
  }

  async deleteAccount() {
    await this.registerPage.elements.deleteAccountLink.waitFor();
    await this.registerPage.elements.deleteAccountLink.click();
    await this.waitForAccountDeleted();
  }

  async continueAfterAccountDeletion() {
    await this.registerPage.elements.continueButton.click();
  }
}

export default RegisterActions;
