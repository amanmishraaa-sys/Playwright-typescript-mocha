import { test } from "../../fixtures/fixture";

test.describe(`Test scenarios on Automation Page`, () => {
  test(
    "Verify alert popup accepting scenario",
    { tag: ["@smoke"] },
    async ({ automationPage }) => {
      await automationPage.checkAndAcceptAlert();
    },
  );

  test(`Perform a step to write United States (USA) in suggesstion box`, async ({
    automationPage,
  }) => {
    const typeText: string = "united";
    const targetText: string = "United States (USA)";
    await automationPage.selectGivenTextInSuggesstionBox(typeText, targetText);
  });
});
