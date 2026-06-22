import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CSVhelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';
import { CartPage } from '../pages/CartPage';

//define the type for page fixtures :
type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage,
    productInfoPage: ProductInfoPage,
    cartPage: CartPage,
    testData: Record<string, string>[]
};

//extend playwright base test
// Don't want to use inbuild test fixtures : 4 Page , request ,brwoser
// child extend parent
export let test = baseTest.extend<pageFixtures>({
    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    cartPage: async ({ page }, use) => {
        let cartPage = new CartPage(page);
        await use(cartPage);
    },

    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }
})

export { expect } from '@playwright/test';