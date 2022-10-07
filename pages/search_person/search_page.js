// @ts-check
import { logger, filename } from '../../config/logger.js'

export class SearchPage {
  constructor(page){
    this.page = page;
    this.inputSearch = page.locator('input[class*="Search"]');
    this.buttonSearch = page.locator('button[class*="Search"]');
    this.alertField = page.locator('p[class*="Search"]');
    this.listEmails = page.locator('form > div[class*="emails"]');
    this.valueEmail = page.locator('div + p[class^="Information"]');
  }

  findInfoEmail = async () => {
    await this.valueEmail.waitFor({state:"attached"})
    logger.log('info', `${filename(__filename)}-locator wait with value email"`)
    return await this.valueEmail;
  }

  searchPersonByFullText = async (data) => {
    await this.buttonSearch.isDisabled();
    await this.alertField.isHidden();
    await this.inputSearch.fill(data.email);
    await Promise.all([
      this.page.waitForNavigation(),
      await this.buttonSearch.click()
    ])
  }
}