import { Page, Locator, expect } from "@playwright/test";

export class LoginPage{

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly username: string = "rahulshettyacademy";
    readonly password: string = "Learning@830$3mK2";
    readonly loginUrl: string = "https://rahulshettyacademy.com"
    readonly blinkingTexts: Locator;
    constructor( readonly page: Page){
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.getByRole("button",{name: "Sign In"});
        this.blinkingTexts = page.locator(".blinkingText");
    }

    async navigateToLoginPage(){
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async loginIntoThePage(){
        await this.navigateToLoginPage();
        await this.usernameInput.fill(this.username);
        await this.passwordInput.fill(this.password);
        await this.signInButton.click();
        await expect(this.page).toHaveURL(this.loginUrl+"/angularpractice/shop");
        await this.verifyPageTitle("ProtoCommerce");
    }

    async verifyPageTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }

    async verifyNewTabOpeningOnClickingDifferentlinks(linkText: string){
        const [newPage] = await Promise.all([this.page.context().waitForEvent('page'),
            this.blinkingTexts.filter({hasText: linkText}).click()
        ]);
        await expect(newPage).toHaveURL(this.loginUrl+"/documents-request");
        let h1Title: Locator = newPage.locator("h1");
        await expect(h1Title.getByText("Documents request")).toBeVisible();
    }
}