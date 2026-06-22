import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
    //Private Locator
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly checkout: Locator;

    //constructor 
    constructor(page: Page) {
        super(page);
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.checkout = page.locator('div.buttons div a.btn-primary');
    };

    async isCheckoutBtnVisible(): Promise<boolean> {
        return await this.checkout.isVisible();
    }
}