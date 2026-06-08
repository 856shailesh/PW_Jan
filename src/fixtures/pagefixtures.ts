import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CSVhelper';

//define the type for page fixtures :
type pageFixtures = {
    loginPage: LoginPage,
    homePage: HomePage,
    testData: Record<string, string>[]
};

//extend playwright base test
// Don't want to use inbuild test fixtures : 4 Page , request ,brwoser
// child extend parent
export let test = baseTest.extend<pageFixtures>({
    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }
})

export { expect } from '@playwright/test';