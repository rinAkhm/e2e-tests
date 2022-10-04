export class LoginPage {
  constructor(page) {
    this.page = page;
    this.buttonFollowLogin = page.locator('a[href$="openid"]');
    this.login = page.locator('#userNameInput');
    this.password = page.locator('#passwordInput');
    this.buttonLogin = page.locator('#submitButton');
    this.exitButton = page.locator('h1 + nav + div > div :last-child');
    this.menuBar = page.locator('#root [class^="Header"] [class*="_logo_"]');
    this.menuBarLocator = '#root [class^="Header"] [class*="_logo_"]';

  }
  
  isAuth = async () => {
    const tmp = await this.page.$$(this.menuBarLocator)
    if (tmp.length > 0 ){
      return true;
    };
    return false;
  }

  auth = async () => {
    if (await this.isAuth()) {
      await this.menuBar.click();
      await Promise.all([
        await this.exitButton.click(),
        await this.page.goto('/profile_search'),
        // await this.page.goBack()
      ])
    };   
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
};
