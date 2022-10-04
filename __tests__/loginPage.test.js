// @ts-check
import { Applications } from '../pages/applications.js';
const { test, expect } = require('@playwright/test');

let app;

test.beforeEach(async ({ page }) => {
    app = new Applications(page);
    await app.openLoginPage();
});

test('open login page', async () => { 
    await app.login.auth();
    expect(await app.login.isAuth()).toEqual(true);
});
