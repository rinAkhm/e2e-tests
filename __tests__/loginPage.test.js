// @ts-check
import { Applications } from '../pages/applications.js';
const { test, expect} = require('@playwright/test');

test('open login page', async ({ page }) => {
    const app = new Applications(page);
    app.goto('https://dev.digitalprofile.innopolis.university/login_page');;
    const expected = await app.login.auth();
    await expect(expected).toMatch('Look up a student');
})