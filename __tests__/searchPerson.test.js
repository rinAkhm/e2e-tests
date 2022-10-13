
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

test.describe('positive test cases', () => {
  records.forEach(data => {
    test(`check to search with field ${data.test_case}`, async () => {
    const actual = await app.searchPerson.checkSearchInputField(data);
    expect(await app.searchPerson.getStateSearchButton()).toBeEnabled();
    expect(actual).toMatch(data.moodle_id);
  });
});

  test('search person using dragAndDrop with valid data', async ()=> {
    data = SearchPersonModel.getEmail();
    await app.searchPerson.searchPersonByDropDown(data.email);
    const actual = await app.studentProfile.verifyStudentProfile();
    await expect(actual).toBe(data.email);
  })
})