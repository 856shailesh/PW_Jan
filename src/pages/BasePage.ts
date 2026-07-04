import { Locator, Page } from "@playwright/test";

export class BasePage {
    //only within class or child of Base Page (those who extend)
    protected readonly page: Page;

    //common locators
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByPlaceholder('Search');
        this.searchIcon = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.footerLinks = page.locator('footer a');
        this.cartButton = page.locator('div#cart button');
    }

    //helper utiltity , generic 
    // common locators , functionalities;

    async isLogoVisible(): Promise<boolean> {
        return this.logo.isVisible();
    }
    async isSearchBoxVisible(): Promise<boolean> {
        return this.searchBox.isVisible();
    }
    async isCurrencyBoxVisible(): Promise<boolean> {
        return this.currency.isVisible();
    }
    async getPageFootersCount(): Promise<number> {
        return await this.footerLinks.count();
    }
    async getPageFooters(): Promise<string[]> {
        return await this.footerLinks.allInnerTexts();
    }

    //Page level generic methods:
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }
    getCurrentURL() {
        return this.page.url();
    }
    async watiForPageLoad() {
        return await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string) {
        return await this.page.screenshot({
            fullPage: true,
            path: `reports/screenshot/${name}.png`
        });
    }
}