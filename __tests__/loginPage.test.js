// @ts-check
import { LoginModel } from '../pages/login_page/model.js';
const { expect } = require('@playwright/test');
import { test } from '../lib/applications.js';

let data;

test('login page in system', async ({loginPage, searchPerson}) => {
  data = new LoginModel();
  await loginPage.goto();
  await loginPage.loginToApplication(data);
  const actual = await searchPerson.verifyLoginAccount();
  expect(await actual, 'can\'t verify login Account').toBe(true);
});
