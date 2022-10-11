// @ts-check
import { LoginPage } from '../pages/login_page/loginPage.js';
import { SearchPage } from '../pages/search_page/searchPage.js';
import { StudentProfilePage } from '../pages/student_profile_page/studentProfilePage.js';
import { logger, filename } from '../config/logger.js'


export class Applications {
  constructor(page) {
    this.page = page;
    this.login = new LoginPage(page);
    this.searchPerson = new SearchPage(page);
    this.studentProfile = new StudentProfilePage(page);
  }
} 
