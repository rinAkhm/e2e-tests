import { BrowserContext, expect } from '@playwright/test';

const waitForElement = 120000;

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async gotoPage(url) {
    this.page.goto(url);
  }

  async waitForPageNavigation(event) {
    switch (event.toLowerCase()) {
        case `networkidle`:
            await this.page.waitForNavigation({ waitUntil: `networkidle`, timeout: waitForElement });
            break;
        case `load`:
            await this.page.waitForNavigation({ waitUntil: `load`, timeout: waitForElement });
            break;
        case `domcontentloaded`:
            await this.page.waitForNavigation({ waitUntil: `domcontentloaded`, timeout: waitForElement });
    }
  }

  async clickElement(locator){
    await this.page.click(locator);
  }

  async clickElementJS(locator) {
    await this.page.$eval(locator, (element) => element.click());
  }
  
  async enterElementText(locator, text) {
    await this.page.fill(locator, text)
  }

  async getTextByLocator(locator) {
    const textValue = await this.page.textContent(locator);
    return textValue.trim();
  }

  async findElement(locator) {
    return await this.page.locator(locator);
  }

  async findAttributValue(locator, name) {
    return await this.page.locator(locator).getAttribute(name)
  }

  async selectElementFromList(locator, insideLocator, textLocator, textValue) {
    return await this.page.locator(locator).
      locator(insideLocator, { 
        has: this.page.locator(textLocator),
        hasText: textValue
      }).click();
  }

  async selectOptionFromDropdown(locator, option) {
    const selectDropDownLocator = await this.page.locator(locator);
    selectDropDownLocator.selectOption({ value: option });
}

  async verifyCountElement (locator) {
    const listEl = await this.page.locator(locator).count();
    return listEl;
  }
 
  async checkPropertiesIsDisabled(locator) {
    const isStatus = await this.page.locator(locator).isDisabled();
    expect(isStatus).toBe(true);
  }

  async verifyUrlPage(page, line){
    const re = new RegExp(line, 'i');
    await expect(page, 'not match with url').toHaveURL(re);
  }

  async verifyElementContainsText(locator, text) {
    await expect(this.page.locator(locator)).toContainText(text);
  }
  async verifyJSElementValue(locator, text) {
    const textValue = await this.page.$eval(locator, (element) => element.value);
    expect(textValue.trim()).toBe(text);
  }

  async expectToBeTrue(status, errorMessage) {
    expect(status, `${errorMessage}`).toBe(true);
  }
}