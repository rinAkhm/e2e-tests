import { LoginPage } from './login/login_page.js';

export class Applications {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
  }

  async openLoginPage() {
    await this.page.goto('/login_page');
  }
} 
