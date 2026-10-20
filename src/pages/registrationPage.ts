import { Page, Locator } from "@playwright/test";
import { UtilManager } from "../utils/utilManager";


export class RegistrationPage {

    readonly registrationPageUrl: string = process.env.registrationPage!;
    readonly utilManager: UtilManager;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly userMobile: Locator;
    readonly occupation: Locator;
    readonly genderRadioButton: (gender: string) => Locator;
    readonly passwordField: (fieldName: string) => Locator;
    readonly eighteenYearsOldCheckbox: Locator;
    readonly registerButton: Locator;
    readonly registrationPageHeading: Locator;
    readonly accountCreatedSuccessfully: Locator;
    readonly registeredSuccessfully: Locator;

    constructor(readonly baseurl: string, readonly page: Page) {
        this.utilManager = new UtilManager(this.page);
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.email = page.locator("#userEmail");
        this.userMobile = page.locator("#userMobile");
        this.occupation = page.locator(`[formcontrolname="occupation"]`);
        this.genderRadioButton = (gender: string) => page.locator(`[value='${gender}']`);
        this.passwordField = (fieldName: string) => page.locator(`#${fieldName}`);
        this.eighteenYearsOldCheckbox = page.locator(`[type='checkbox']`);
        this.registerButton = page.locator("#login");
        this.registrationPageHeading = page.locator(`[class*='login-wrapper'] h1`).getByText("Register");
        this.accountCreatedSuccessfully = page.locator(`[class*="login-wrapper"] h1`).getByText('Account Created Successfully');
        this.registeredSuccessfully = page.getByRole('generic',{ name: "Registered Successfully"});
    }

    /**
    * To navigate to the registration page.
    */
    async navigateToRegistrationPage(){
        await this.utilManager.pNUtil.navigateToUrl(this.baseurl+this.registrationPageUrl)
    }

    /**
    * Wait for the registration page to load.
    */
    async waitForRegistrationPageToLoaded(){
        await this.utilManager.verifier.isVisible(this.registrationPageHeading);
    }

    /**
    * To enter first name in the first name field.
    * @param value - The first name to be entered.
    */
    async enterFirstName(value: string) {
        await this.utilManager.pAUtil.typeInInputField(this.firstName, value);
    }

    /**
    * To enter last name in the last name field.
    * @param value - The last name to be entered.
    */
    async enterLastName(value: string){
        await this.utilManager.pAUtil.typeInInputField(this.lastName, value);
    }

    /**
    * To enter email in the email field.
    * @param value - The email to be entered.
    */
    async enterEmail(value: string){
        await this.utilManager.pAUtil.typeInInputField(this.email, value);
    }

    /**
    * To enter mobile number in the mobile number field.
    * @param value - The mobile number to be entered.
    */
    async enterMobile(value: string){
        await this.utilManager.pAUtil.typeInInputField(this.userMobile, value);
    }

    /**
    * To select an option in the occupation dropdown.
    * @param optionToBeSelected - The option to be selected.
    */
    async selectOptionInOccupationField(optionToBeSelected: string) {
        await this.utilManager.pAUtil.handleDropdownField(this.occupation, optionToBeSelected);
    }

    /**
    * To select a gender radio button.
    * @param gender - The gender to be selected(Male/Female).
    */
    async selectGender(gender: string) {
        await this.utilManager.pAUtil.clickElement(this.genderRadioButton(gender));
    }

    /**
    * To fill the password field.
    * @param fieldName - The name of the password field.
    * @param value - The value to be entered.
    */
    async fillPasswordField(fieldName: string, value: string) {
        await this.utilManager.pAUtil.typeInInputField(this.passwordField(fieldName), value);
    }

    /**
    * To check the eighteen years old checkbox.
    */
    async checkEighteenYearsOldCheckbox() {
        await this.utilManager.pAUtil.checkTheCheckbox(this.eighteenYearsOldCheckbox);
    }

    /**
    * To click on the register button.
    */
    async clickOnRegisterButton() {
        await this.utilManager.pAUtil.clickElement(this.registerButton);
    }

    /**
    * To verify the visibility of Registered Successfully message.
    */
    async verifyTheVisibilityOFRegisteredSuccessfullyMessage(){
        await this.utilManager.verifier.isVisible(this.registeredSuccessfully);
    }

    /**
    * To verify the visibility of Account Successfully created message.
    */
    async verifyAccountCreatedSuccessfully(){
        await this.utilManager.verifier.isVisible(this.accountCreatedSuccessfully);
    }

    /**
    * To fill all the details in the registraion form.
    * @param occupation - Occupation of the user to be registered.
    * @param gender - Gender of the user to be registered.
    * @param password - Password of the user.
    */
    async fillTheRegistrationFormWithRandomFirstAndLastName(occupation: "Doctor" | "Student" | "Engineer" | "Scientist", gender: "Male" | "Female" , password: string){
        const firstName = this.utilManager.utility.generateRandomFirstName();
        const lastName = this.utilManager.utility.generateRandomLastName();
        const email = this.utilManager.utility.generateEmailWithGivenNames(firstName, lastName);
        const mobile = this.utilManager.utility.generateRandomMobileNumber();
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterMobile(mobile);
        await this.selectOptionInOccupationField(occupation);
        await this.selectGender(gender);
        await this.fillPasswordField("userPassword",password);
        await this.fillPasswordField("confirmPassword",password);
        await this.checkEighteenYearsOldCheckbox();
    }
}