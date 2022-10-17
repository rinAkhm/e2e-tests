// @ts-check
import { LoginPage } from '../pages/login_page/loginPage.js';
import { SearchPage } from '../pages/search_page/searchPage.js';
import { StudentProfilePage } from '../pages/student_profile_page/studentProfilePage.js';
import { logger, filename } from '../config/logger.js'
import { test as baseTest } from '@playwright/test';

//TODO: clear code
export const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  searchPerson: async ({ page }, use) => {
    await use(new SearchPage(page))
  },
  studentProfile: async ({ page }, use) => {
    await use(new StudentProfilePage(page))
  },
}) 

    // async ({ page }, use) => {
    // await use(new SearchPage(page))}
// export class Applications {
//   constructor(page) {
//     this.page = page;
//     this.login = LoginPage; //new LoginPage(page);
//     this.searchPerson = new SearchPage(page);
//     this.studentProfile = new StudentProfilePage(page);
//   }

//   async login ({page}, use) {
//     await use(new LoginPage(page));
// }
// } 
