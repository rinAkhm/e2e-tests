// @ts-check
import { logger, filename } from '../../config/logger.js'

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
    const bar = await this.page.$$(this.menuBarLocator)
    if (bar.length > 0 ){
      return true;
    };
    return false;
  }

  auth = async (data) => {
    // if (await this.page.$$(this.menuBarLocator).length) {
    //   await Promise.all([
    //     this.menuBar.click(),
    //     this.page.waitForNavigation(),
    //     this.exitButton.click()
    //   ])  
    // }
    if (await this.isAuth()) {
      await Promise.all([
        this.menuBar.click(),
        this.page.waitForNavigation(),
        this.exitButton.click()
      ])  
    };   
    await Promise.all([
      this.buttonFollowLogin.first().click(),
      this.page.waitForNavigation()
    ]);
    await this.login.fill(process.env.LOGIN);
    await this.password.fill(process.env.PASSWORD);
    logger.log('info', `${filename(__filename)}-login=${data.username} passsword=${data.passsword}`);
    await Promise.all([
      this.buttonLogin.click(),
      this.page.waitForNavigation()
    ]);
    await this.page.locator('h3').innerHTML();
    logger.log('info', `${filename(__filename)}-found text "Look up a student"`)
  }
};
