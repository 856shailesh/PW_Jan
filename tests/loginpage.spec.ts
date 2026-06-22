import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { HomePage } from "../src/pages/HomePage";

let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);
})

test('login page title test', async ({ }) => {
    const pageTitle = await loginPage.getLoginPageTitle();
    console.log("login page title is , ", pageTitle);
    expect(pageTitle).toBe('Account Login');
})

test('forget password link exist test', async ({ }) => {
    expect(await loginPage.isForgetPwdLinkExist()).toBeTruthy(); // Assert
})

test('user is able to login to app test', async ({ }) => {
    await loginPage.doLogin('856shaileshkumar@gmail.com', 'IloveIndia');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
})