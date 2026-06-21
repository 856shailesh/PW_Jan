import { test, expect } from '../src/fixtures/pagefixtures'
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CSVhelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})

test('login page title test', async ({ loginPage }) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log("login page title is , ", pageTitle);
    expect(pageTitle).toBe('Account Login');
})

test('forget password link exist test', async ({ loginPage }) => {
    expect(await loginPage.isForgetPwdLinkExist()).toBeTruthy(); // Assert
})

test('user is able to login to app test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});

//DD1 : Sequential mode - only 1 Test running
test('login to app using wrong credentails using DDT', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});

//DD2 : w/o fixture , parallel mode . read data directly from loop
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`invalid login test ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
}


let logintestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for (let row of logintestData) {
    test(`invalid login test using excel data ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
};

let loginJSONData = JsonHelper.readJson('src/data/login.json');
for (let row of loginJSONData) {
    test(`invalid login test using JSON data ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    })
};