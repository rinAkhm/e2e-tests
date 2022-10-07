// @ts-check
import { LoginPage } from './login/login_page.js';
import { SearchPage } from './search_person/search_page.js';
import { logger, filename } from '../config/logger.js'


export class Applications {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
    this.searchPage = new SearchPage(page);
  }


  async openBasePage() {
    await this.page.goto('/profile_search');
    logger.log('info', `${filename(__filename)}-open search page"`)
  }
} 
