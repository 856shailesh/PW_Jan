import { test, expect } from '../src/fixtures/pagefixtures';
import { CartPage } from '../src/pages/CartPage';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

test('company logo exist on Cart Page', async ({ homePage, searchResultsPage, productInfoPage, basePage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.doFillQty('2');
    await productInfoPage.doClickCartBtn();
    expect(await basePage.isLogoVisible()).toBeTruthy();
})

test('Verify if checkout link is available', async ({ homePage, searchResultsPage, productInfoPage, cartPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.doFillQty('2');
    await productInfoPage.doClickCartBtn();
    expect(await cartPage.isCheckoutBtnVisible()).toBeTruthy();
});