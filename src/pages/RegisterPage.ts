import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
    //Private Locator
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly passwordConfirm: Locator;
    private readonly subscribeYes: Locator;
    private readonly subscribeNo: Locator;
    private readonly privacyPolicy: Locator;
    private readonly continueBtn: Locator;
    private readonly registerSuccessMsg: Locator;

    //constructor 
    constructor(page: Page) {
        super(page);
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-mail' });
        this.telephone = page.getByRole('textbox', { name: 'Telephone' });
        this.password = page.locator('#input-password');
        this.passwordConfirm = page.locator('#input-confirm');
        this.subscribeYes = page.getByLabel('Yes');
        this.subscribeNo = page.getByLabel('No');
        this.privacyPolicy = page.locator('//input[@name="agree"]');
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        //this.registerSuccessMsg = page.locator('#content h1');
        this.registerSuccessMsg = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    };

    //public page actions
    async goToRegisterPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/register');
    }

    async doRegister(firstName: string, lastName: string, email: string, telephone: string, password: string, subscribe: boolean): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.passwordConfirm.fill(password);
        if (subscribe) {
            await this.subscribeYes.check();
        } else {
            await this.subscribeNo.check();
        }
        await this.privacyPolicy.check();
        await this.continueBtn.click();
    }

    async isRegisterSuccessMsgDisplayed(): Promise<Boolean> {
        return await this.registerSuccessMsg.isVisible();
    }
}