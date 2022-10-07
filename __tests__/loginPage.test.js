// @ts-check
import { Applications } from '../pages/applications.js';
import { LoginModel } from '../pages/login/model.js';
const { test, expect } = require('@playwright/test');

let app;
let data;

test.beforeEach(async ({ page }) => {
    app = new Applications(page);
    data = new LoginModel(process.env.LOGIN, process.env.PASSWORD);
});

test('login page in system', async () => {
    await app.login.openLoginPage();
    await app.login.auth(data);
    expect(await app.login.isAuth()).toEqual(true);
});
