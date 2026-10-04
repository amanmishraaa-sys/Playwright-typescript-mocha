import { Page } from "@playwright/test";
import { pageNavigationUtil } from "../utils/pageNavigationUtils";
import { ExcelUtil } from "../utils/excelUtil";
import { FileUtils } from "../utils/fileUtils";
import { pageActionUtil } from "./pageActionUtils";
import { Verifier } from "./verifier";

export class UtilManager {
  readonly eUtil: ExcelUtil;
  readonly fUtil: FileUtils;
  readonly pAUtil: pageActionUtil;
  readonly pNUtil: pageNavigationUtil;
  readonly verifier: Verifier;

  constructor(readonly page: Page) {
    this.eUtil = new ExcelUtil();
    this.fUtil = new FileUtils();
    this.pAUtil = new pageActionUtil(page);
    this.pNUtil = new pageNavigationUtil(page);
    this.verifier = new Verifier();
  }
}
