import LoginPage from '../pages/LoginPage.js';
import RegisterPage from '../pages/RegisterPage.js';
import LoginActions from '../actions/LoginActions.js';
import RegisterActions from '../actions/RegisterActions.js';

class TestContext {
  constructor(page) {
    this.page = page;
    this.pages = {
      login: new LoginPage(page),
      register: new RegisterPage(page),
    };

    this.actions = {
      login: new LoginActions(page, this.pages.login),
      register: null,
    };

    this.actions.register = new RegisterActions(
      page,
      this.pages.register,
      this.actions.login
    );
  }
}

export default TestContext;
