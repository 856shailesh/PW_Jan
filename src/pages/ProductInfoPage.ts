import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {
    //Private Locator
    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricing: Locator;
    private readonly productQty: Locator;
    private readonly addtoCartBtn: Locator;
    private readonly successMsg: Locator;
    private readonly cartBtn: Locator;
    private readonly viewCartBtn: Locator;
    private map: Map<string, string | number>;

    //constructor 
    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { name: '', level: 1 });
        this.productImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricing = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productQty = page.locator('#input-quantity');
        this.addtoCartBtn = page.locator('#button-cart');
        this.cartBtn = page.locator('#cart-total');
        this.viewCartBtn = page.locator('#cart ul p a strong i.fa-shopping-cart');
        this.successMsg = page.locator('.alert.alert-success.alert-dismissible');
        this.map = new Map<string, string | number>();
    };

    //actions:
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        //await this.page.waitForTimeout(2000);
        await this.productImages.first().waitFor({ state: 'visible' })
        return await this.productImages.count();
    }

    async doFillQty(qty: string): Promise<void> {
        await this.productQty.fill(qty);
        console.log("Entered Quantity", qty);
        await this.addtoCartBtn.click();
    }

    async getSuccessMsg(): Promise<string | null> {
        const alertText = await this.successMsg.innerText();
        //const successText = alertText?.split(':')[0].trim();
        //await this.successText.waitFor({ state: 'visible' })
        console.log('Inner text is ', alertText);
        return await alertText;
    }

    async doClickCartBtn(): Promise<void> {
        await this.cartBtn.click();
        await this.viewCartBtn.waitFor({ state: 'visible' })
        await this.viewCartBtn.click();
    }

    /**
     * Internally calls Private method : Encapsulation
     * @returns the actual Prodcut data : header , images , metadata & pricing data
     */
    async getProductInfo(): Promise<Map<string, string | number>> {
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProdcutIamges', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }

    private async getProductMetaData(): Promise<void> {
        let metData = await this.productMetaData.allInnerTexts();
        for (let data of metData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaVal = meta[1].trim();
            this.map.set(metaKey, metaVal);
        }
    }

    private async getProductPricingData(): Promise<void> {
        let priceData = await this.productPricing.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('Product Price', productPrice);
        this.map.set('ExTaxPrice', exTaxPrice);
    }
}