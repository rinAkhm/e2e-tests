// @ts-check
import { LoginModel } from '../pages/login_page/model.js';
import { SearchPersonModel } from '../pages/search_page/model.js';
import { test } from '../lib/applications.js';
const { expect } = require('@playwright/test');

const { parse } = require('csv-parse/sync');
const fs = require('fs');
const path =  require('path');

let loginData;
let data;

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const records = parse(fs.readFileSync(getFixturesPath('users.csv')), {
  columns: true,
  skip_empty_lines: true
});


test.beforeEach(async ({ loginPage, searchPerson }) => {
  // app = new Applications(page);
  loginData = new LoginModel();
  await loginPage.goto(); 
  await loginPage.loginToApplication(loginData);
  await searchPerson.isAuth();
});

test.describe('positive test cases', () => {
  records.forEach(data => {
    test(`check to search with field ${data.test_case}`, async ({searchPerson}) => {
    const actual = await searchPerson.checkSearchInputField(data);
    expect(await searchPerson.getStateSearchButton()).toBeEnabled();
    expect(actual).toMatch(data.moodle_id);
  });
});

  test('search person using dragAndDrop with valid data', async ({ searchPerson, studentProfile })=> {
    data = SearchPersonModel.getEmail();
    await searchPerson.searchPersonByDropDown(data.email);
    const actual = await studentProfile.verifyStudentProfile();
    await expect(actual).toBe(data.email);
  })
})