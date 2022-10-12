// @ts-check
import { logger, filename } from '../../config/logger.js'
import { BasePage } from '../../lib/base_page.js';
import { SearchPageLocators } from '../../common/SearchPageLocators.js';


export class SearchPage extends SearchPageLocators {
  constructor(page){
    super()
    this.page = page;
    this.basePage = new BasePage(this.page);
  }
  

  async goto(){
    await this.basePage.gotoPage('/profile_search');
    logger.log('info', `${filename(__filename)}-open profile_search"`)
  };

  async verifyLoginAccount() {
    await this.basePage.waitForPageNavigation('load');
    const isAuth = await this.basePage.verifyCountElement(this._barMenu);
    if (isAuth > 0) {
      return true;
    }
    return false;
  }

  async isAuth(){
    const state = await this.verifyLoginAccount();
    await this.basePage.expectToBeTrue(state, 'you are not logged in, access is restricted');
  }
  
  async searchPersonByFullText (data) {
    await this.basePage.checkPropertiesIsDisabled(this._buttonSearch);
    await this.basePage.enterElementText(this._inputSearch, data);
    await this.basePage.clickElement(this._buttonSearch);
    logger.log('info', `${filename(__filename)}-choice email=${data}`)
  }

  async searchPersonByDropDown(data) {
    const sliceData = data.slice(0,3);
    await this.basePage.checkPropertiesIsDisabled(this._buttonSearch);
    await this.basePage.enterElementText(this._inputSearch, sliceData);
    logger.log('info', `${filename(__filename)}-input to field symbol=${sliceData}`)
    await this.basePage.selectElementFromList(this._listEmails[0],
      this._listEmails[1], this._listEmails[2], data);
    await this.basePage.clickElement(this._buttonSearch);
    logger.log('info', `${filename(__filename)}-choice email=${data}`)
  }
}