// @ts-check
import { Applications } from '../lib/applications.js';
import { LoginModel } from '../pages/login_page/model.js';
const { test, expect } = require('@playwright/test');

let app;
let data;

test.beforeEach(async ({ page }) => {
    app = new Applications(page);
    data = new LoginModel();
});

test('login page in system', async () => {
  await app.login.goto();
  await app.login.loginToApplication(data);
  const actual = await app.searchPerson.verifyLoginAccount();
  expect(await actual, 'can\'t verify login Account').toBe(true);
});
