import LoginPage from '../pages/LoginPage.js';

class LoginActions {
  constructor(page, loginPage = new LoginPage(page)) {
    this.page = page;
    this.loginPage = loginPage;
  }

  async waitForLoginPage() {
    await this.loginPage.elements.loginHeading.waitFor();
    await this.loginPage.elements.signupHeading.waitFor();
  }

  async waitForLoggedInState() {
    await this.loginPage.elements.loggedInAsLabel.waitFor();
  }

  async submitLogin(email, password) {
    await this.loginPage.elements.loginEmailInput.fill(email);
    await this.loginPage.elements.loginPasswordInput.fill(password);
    await this.loginPage.elements.loginButton.click();
  }

  async openLogin() {
    await this.page.goto('/login');
    await this.waitForLoginPage();
  }

  async openHomeAndNavigateToLogin() {
    await this.page.goto('/');
    await this.loginPage.elements.signupLoginNavLink.click();
    await this.waitForLoginPage();
  }

  async login(email, password) {
    await this.submitLogin(email, password);
  }

  async logout() {
    await this.loginPage.elements.logoutLink.click();
    await this.waitForLoginPage();
  }
}

export default LoginActions;
