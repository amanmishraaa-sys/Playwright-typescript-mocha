import { test } from "../../fixtures/fixture";
import dotenv from "dotenv";
import path from "path";
import { RegistrationPage } from "../../pages/registrationPage";

dotenv.config({
  path: path.resolve(__dirname, "../../testcases.env"),
  override: true,
});

test.describe("test suite for UI Basics", () => {
  test(`Verify that user is able to fill username and password at login page`, async ({
    clientLoginPage,
  }) => {
    await clientLoginPage.enterUsername("Double Bangle");
    await clientLoginPage.verifyUsernameTextInput("Double Bangle");
    await clientLoginPage.enterPassword("DoubleDouble");
    await clientLoginPage.verifyPasswordTextInput("DoubleDouble");
  });

  test(`Verify that user is getting invalid email popup on entering wrong email format`, async ({
    clientLoginPage,
  }) => {
    await clientLoginPage.enterUsername("doublebangle.com");
    await clientLoginPage.verifyUsernameTextInput("doublebangle.com");
    await clientLoginPage.clickOnLoginButton();
    await clientLoginPage.verifyVisibilityOfInvalidEmailErrorMessage();
  });

  test(`Verify that user get wrong password error message when user enters wrong password`, async ({
    clientLoginPage,
  }) => {
    await clientLoginPage.enterUsername("doublebangle@gmail.com");
    await clientLoginPage.verifyUsernameTextInput("doublebangle@gmail.com");
    await clientLoginPage.enterPassword("DoubleDouble");
    await clientLoginPage.verifyPasswordTextInput("DoubleDouble");
    await clientLoginPage.clickOnLoginButton();
    await clientLoginPage.verifyVisibilityOfWrongErrorMessage();
  });
});

test.describe(`Test suite for registeration page`, () => {
  test(`Verify that user is able to register with valid details`, async ({ clientLoginPage }) => {
    await clientLoginPage.clickOnRegistrationButton();
    const baseUrl = 'https://rahulshettyacademy.com';
    const registrationPage = new RegistrationPage(baseUrl, clientLoginPage.page);
    await registrationPage.waitForRegistrationPageToLoaded();
    await registrationPage.fillTheRegistrationFormWithRandomFirstAndLastName("Student","Male","Aman@12345");
    await registrationPage.clickOnRegisterButton();
    await registrationPage.verifyAccountCreatedSuccessfully();
  });
});
