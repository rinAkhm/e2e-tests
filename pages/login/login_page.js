
require('dotenv').config();

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.buttonFollowLogin = page.locator('a[href$="openid"]');
    this.login = page.locator('#userNameInput');
    this.password = page.locator('#passwordInput');
    this.buttonLogin = page.locator('#submitButton');
  }

  auth = async () => {
    await Promise.all([
      this.buttonFollowLogin.first().click(),
      this.page.waitForNavigation()
    ]);
    await this.login.fill(process.env.LOGIN);
    await this.password.fill(process.env.PASSWORD);
    await Promise.all([
      this.buttonLogin.click(),
      this.page.waitForNavigation()
    ]);
    return await this.page.locator('h3').innerHTML();
  }
}
