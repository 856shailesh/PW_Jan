import { Page } from "@playwright/test";

export class BasePage {
    //only within class or child of Base Page (those who extend)
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //helper utiltity , generic 
}