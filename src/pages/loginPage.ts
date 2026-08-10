import { Page, Locator, expect, test } from "@playwright/test";
import { Verifier } from "../utils/verifier";

export class LoginPage{

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly username: string = "rahulshettyacademy";
    readonly password: string = "Learning@830$3mK2";
    readonly loginUrl: string = "https://rahulshettyacademy.com"
    readonly blinkingTexts: Locator;
    readonly termsAndConditionsCheckbox: Locator;
    readonly incorrectCredsErrorMessage: Locator;

    constructor( readonly page: Page){
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.getByRole("button",{name: "Sign In"});
        this.blinkingTexts = page.locator(".blinkingText");
        this.termsAndConditionsCheckbox = page.locator("#terms");
        this.incorrectCredsErrorMessage = page.locator("[style='display: block;']");
    }

    async veryPageIsLoaded(){
        await test.step(`Login in confirmed`, async() => {
            await expect(this.page).toHaveURL(this.loginUrl+"/angularpractice/shop");
            await this.verifyPageTitle("ProtoCommerce");
        });
    }

    async navigateToLoginPage(){
        await test.step(`Navigate to URL: ${this.loginUrl+"/loginpagePractise/"}`, async () => {
            await this.page.goto(this.loginUrl+"/loginpagePractise/");
        });
    }

    async loginIntoThePage(){
        await this.navigateToLoginPage();
        await this.enterUsername(this.username);
        await this.enterPassword(this.password);
        await this.checkTermsAndConditionCheckbox();
        await this.clickSignInButton();
        await this.veryPageIsLoaded();
    }

    async enterUsername(username: string){
        await test.step(`Enter username as ${username}`, async()=>{
            await this.usernameInput.fill(username);
        });
    }
    
    async enterPassword(password: string){
        await test.step(`Enter password as ${password}`, async()=>{
            await this.passwordInput.fill(password);
        });
    }

    async clickSignInButton(){
        await test.step(`Click on signin button`,async()=>{
            await this.signInButton.click();
        });
    }

    async verifyPageTitle(title: string){
        await test.step(`Verify the title of the page as ${title}`, async() => {
            await expect(this.page).toHaveTitle(title);
        });
    }

    async verifyNewTabOpeningOnClickingDifferentlinks(linkText: string){
        const [newPage] = await Promise.all([this.page.context().waitForEvent('page'),
            this.blinkingTexts.filter({hasText: linkText}).click()
        ]);
        await expect(newPage).toHaveURL(this.loginUrl+"/documents-request");
        let h1Title: Locator = newPage.locator("h1");
        await expect(h1Title.getByText("Documents request")).toBeVisible();
    }

    async checkTermsAndConditionCheckbox(){
        !await this.termsAndConditionsCheckbox.isChecked() ? await this.termsAndConditionsCheckbox.check(): console.log("Terms and Conditions already checked");
    }

    async verfiyWrongCredsAlertMessage(){
        await Verifier.isVisible(this.incorrectCredsErrorMessage, 10000);
        // await expect(this.incorrectCredsErrorMessage).toBeVisible({ timeout: 10000 });
    }
}