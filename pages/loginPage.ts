import { Page, Locator, expect } from "@playwright/test";

export class LoginPage{

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly username: string = "rahulshettyacademy";
    readonly password: string = "Learning@830$3mK2";
    readonly loginUrl: string = "https://rahulshettyacademy.com"
    constructor( readonly page: Page){
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.locator("#signInBtn");
    }

    async loginIntoThePage(){
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await this.usernameInput.fill(this.username);
        await this.passwordInput.fill(this.password);
        await this.signInButton.click();
        await expect(this.page).toHaveURL(this.loginUrl+"/angularpractice/shop");
        await this.verifyPageTitle("ProtoCommerce");
    }

    async verifyPageTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }
}