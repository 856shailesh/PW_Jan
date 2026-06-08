import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    //Private Locator
    private readonly emailId: Locator;
    private readonly password: Locator;
    private readonly loginBtn: Locator;
    private readonly forgottenPassswrodLink: Locator;
    private readonly logo: Locator;
    private readonly loginErrorMessage: Locator;

    //constructor 
    constructor(page: Page) {
        super(page);
        this.emailId = page.getByRole('textbox', { name: 'E-mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.forgottenPassswrodLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
        this.logo = page.getByAltText('naveenopencart');
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible')
    };

    //public page actions : behaviour
    async goToLoginPage(): Promise<void> {
        await this.page.goto('opencart/index.php?route=account/login');
    }

    async getLoginPageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isForgetPwdLinkExist(): Promise<Boolean> {
        return await this.forgottenPassswrodLink.isVisible();
    }

    async doLogin(username: string, password: string): Promise<void> {
        console.log(`user cred : ${username} : ${password}`);
        await this.emailId.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }

    async isInvalidLoginErrorDisplayed(): Promise<Boolean> {
        return await this.forgottenPassswrodLink.isVisible();
    }
}