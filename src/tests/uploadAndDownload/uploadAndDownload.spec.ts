import { test } from "../../fixtures/fixture";

test.describe(``, () => {
  test(
    `Verify the downloadding, modfication, uploading, validating the modification on the page and deletion of the file`,
    { tag: ["@smoke", "@download"] },
    async ({ uploadDownloadPage }) => {
      await uploadDownloadPage.clickOnDownloadButtonAndSaveFile();
      await uploadDownloadPage.changeThevalueInDownloadedFile("299", "350");
      await uploadDownloadPage.uploadModifiedFile();
      await uploadDownloadPage.verifyTheChangesOnThePage();
      await uploadDownloadPage.deleteDownloadedFile();
    },
  );
});
