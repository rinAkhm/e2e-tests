
import { Applications } from '../lib/applications.js';
import { LoginModel } from '../pages/login_page/model.js';
import { SearchPersonModel } from '../pages/search_page/model.js';
const path =  require('path');
const { test, expect } = require('@playwright/test');
const { parse } = require('csv-parse/sync');
const fs = require('fs');

let app;
let loginData;
let data;

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const records = parse(fs.readFileSync(getFixturesPath('users.csv')), {
  columns: true,
  skip_empty_lines: true
});


test.beforeEach(async ({ page }) => {
  app = new Applications(page);
  loginData = new LoginModel();
  await app.login.goto(); 
  await app.login.loginToApplication(loginData);
  await app.searchPerson.isAuth();
});


records.forEach(data => {
  test(`testing with ${data.test_case}`, async () => {
    console.log(data.fullname_rus)
  });
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