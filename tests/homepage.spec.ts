import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    await loginPage.doLogin('856shaileshkumar@gmail.com', 'IloveIndia');
    homePage = new HomePage(page);
})

test('home page title test', async ({ }) => {
    const pageTitle = await homePage.getPageTitle();
    console.log("Home page title is , ", pageTitle);
    expect(pageTitle).toBe('My Account');
})

test('logout link exist test', async ({ }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('home page headers exist', async () => {
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('Home page headers', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});