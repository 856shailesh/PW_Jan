import { test, expect } from '../src/fixtures/pagefixtures';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('856shaileshkumar@gmail.com', 'IloveIndia');
})

test('home page title test', async ({ homePage }) => {
    const pageTitle = await homePage.getHomePageTitle();
    console.log("Home page title is , ", pageTitle);
    expect(pageTitle).toBe('My Account');
})

test('logout link exist test', async ({ homePage }) => {
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
})

test('home page headers exist', async ({ homePage }) => {
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