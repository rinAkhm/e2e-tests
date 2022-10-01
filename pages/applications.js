import { LoginPage } from './login/login_page.js';

export class Applications {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
  }

  async goto(url) {
    await this.page.goto(url);
  }
} 
