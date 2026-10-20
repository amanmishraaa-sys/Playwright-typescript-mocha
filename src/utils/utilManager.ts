import { Page } from "@playwright/test";
import { pageNavigationUtil } from "../utils/pageNavigationUtils";
import { ExcelUtil } from "../utils/excelUtil";
import { FileUtils } from "../utils/fileUtils";
import { pageActionUtil } from "./pageActionUtils";
import { Verifier } from "./verifier";
import { utility } from "./utility";

export class UtilManager {
  readonly eUtil: ExcelUtil;
  readonly fUtil: FileUtils;
  readonly pAUtil: pageActionUtil;
  readonly pNUtil: pageNavigationUtil;
  readonly utility: utility;
  readonly verifier: Verifier;

  constructor(readonly page: Page) {
    this.eUtil = new ExcelUtil();
    this.fUtil = new FileUtils();
    this.pAUtil = new pageActionUtil(page);
    this.pNUtil = new pageNavigationUtil(page);
    this.utility = new utility();
    this.verifier = new Verifier();
  }
}
