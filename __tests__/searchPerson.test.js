// @ts-check
import { Applications } from '../lib/applications.js';
import { LoginModel } from '../pages/login_page/model.js';
import { SearchPersonModel } from '../pages/search_page/model.js';
const { test, expect } = require('@playwright/test');

let app;
let loginData;
let data;


test.beforeEach(async ({ page }) => {
    app = new Applications(page);
    loginData = new LoginModel();
    await app.login.goto();
    await app.login.loginToApplication(loginData);
    await app.searchPerson.isAuth();
});

test('search person with valid data', async () => {
    data = SearchPersonModel.getEmail();
    await app.searchPerson.searchPersonByFullText(data.email);
    const actual = await app.studentProfile.verifyStudentProfile();
    await expect(actual).toBe(data.email);
    await app.studentProfile.toHavePageUrl('student');
});

test('search person using dragAndDrop with valid data', async ()=> {
    data = SearchPersonModel.getEmail();
    await app.searchPerson.searchPersonByDropDown(data.email);
    const actual = await app.studentProfile.verifyStudentProfile();
    await expect(actual).toBe(data.email);
})