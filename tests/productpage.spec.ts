import { test, expect } from '../src/fixtures/pagefixtures';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
});

//Data Provider

test(`Verify product images count`, async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProductImagesCount();
    console.log("total images ", imgCount);
    expect(imgCount).toBe(4);
});

test(`Verify product Information data `, async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log("Actual data ", actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Product Price')).toBe('$2,000.00');
});

test('company logo exist on Product Page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
})

test('Verify Product are added in cart', async ({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.doFillQty('2');
    expect.soft(await productInfoPage.getSuccessMsg()).toContain('Success');
})

test('Verify user is able to access Cart page after adding items in cart', async ({ homePage, searchResultsPage, productInfoPage , cartPage }) => {
    await homePage.doSearch('macbook');
    await searchResultsPage.selectProduct('MacBook Pro');
    await productInfoPage.doFillQty('2');
    await productInfoPage.doClickCartBtn();
    expect 
});
