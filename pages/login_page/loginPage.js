// @ts-check
import { logger, filename } from '../../config/logger.js'
import { BasePage }  from '../../lib/base_page.js'
import { LoginPageLocators } from '../../common/LoginPageLocators.js';

export class LoginPage extends LoginPageLocators {
  constructor(page) {
    super()
    this.page = page;
    this.basePage = new BasePage(this.page);
  }
  
  async goto(){
    await this.basePage.gotoPage('/login_page');
    logger.log('info', `${filename(__filename)}-open login page"`)
  };
  
  async loginToApplication(data) {
    await this.basePage.clickElement(this._ButtonFollowLogin);
    await this.basePage.enterElementText(this._inputLogin, data.username);
    await this.basePage.enterElementText(this._inputPassword, data.passsword);
    await this.basePage.clickElement(this._butttonSubmitForm);
    logger.log('info', `${filename(__filename)}-submit login form`)
  };
};
  // }
  //   if (await this.isAuth()) {
  //     await Promise.all([
  //       this.menuBar.click(),
  //       this.page.waitForNavigation(),
  //       this.exitButton.click()
  //     ])  
  //   };   
  //   await Promise.all([
  //     this.page.waitForNavigation(),
  //     this.buttonFollowLogin.first().click()
  //   ]);
  //   await this.login.fill(process.env.LOGIN);
  //   await this.password.fill(process.env.PASSWORD);
  //   logger.log('info', `${filename(__filename)}-login=${data.username} passsword=${data.passsword}`);
  //   await Promise.all([
  //     this.page.waitForNavigation(),
  //     this.buttonLogin.click()
  //   ]);
  
  // isAuth = async () => {
  //   const bar = await this.page.$$(this.menuBarLocator)
  //   if (bar.length > 0 ){
  //     return true;
  //   };
  //   return false;
  // }
  

