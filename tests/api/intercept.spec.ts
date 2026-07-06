import {test , expect} from '@playwright/test'

//intercept the network calls & print on console
test('intercept api request and response', async ({ page }) => { 
    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue();
    });

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=common/home');
});

// Intercept with mocking
//mocking : fake data

test('mock search data api', async ({ page }) => { 
    let fakeProducts = [
        {name: 'Fake Macbook', price: "$1000"},
        {name: 'Fake iPhone', price: "$500"},
    ]
    await page.route('**/index.php?route=product/search&search=macbook', async (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts)
        });
    });
    // This will behave like mock data
    await page.goto('https://abc.com/opencart/index.php?route=product/search&search=macbook');
    page.pause();
    let fakeData = await page.evaluate(async () => {
        let fakeRes = await window.fetch('https://abc.com/opencart/index.php?route=product/search&search=macbook');
        let fakejson = await fakeRes.json();
        return fakejson;
    });
    console.log("Fake Data:", fakeData);
})