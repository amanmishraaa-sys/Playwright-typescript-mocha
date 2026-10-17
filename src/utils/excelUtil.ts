import * as ExcelJS from "exceljs";

export class ExcelUtil {
  constructor() {}

  /**
   * To find and replace a value in the Excel file.
   * @param searchText - The value to be searched in the Excel file.
   * @param newValue - The value to replace the searchText in the Excel file.
   * @param path - The path of the Excel file.
   */
  async findValueAndReplace(
    searchText: string,
    newValue: string,
    path: string,
  ) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);
    const worksheet = workbook.getWorksheet("Sheet1");

    if (!worksheet) {
      console.error('Worksheet "Sheet1" not found');
      return;
    }

    const { rowNumber, columnNumber } = await this.readFileToGetCoordinates(
      worksheet,
      searchText,
    );

    if (rowNumber === 0 || columnNumber === 0) {
      console.error(`Value "${searchText}" not found in the worksheet`);
      return;
    }

    await this.replaceValueAt(
      workbook,
      worksheet,
      path,
      newValue,
      rowNumber,
      columnNumber,
    );
  }

    /**
   * To replace a value at a location in the Excel file.
   * @param workbook - The ExcelJS workbook instance.
   * @param worksheet - The ExcelJS worksheet instance.
   * @param path - The path of the Excel file.
   * @param newValue - The value to replace the existing value with.
   * @param rowNumber - The row number of the cell to replace.
   * @param columnNumber - The column number of the cell to replace.
   */
  async replaceValueAt(
    workbook: ExcelJS.Workbook,
    worksheet: ExcelJS.Worksheet,
    path: string,
    newValue: string,
    rowNumber: number,
    columnNumber: number,
  ) {
    const cell = worksheet.getCell(rowNumber, columnNumber);
    cell.value = newValue;
    await workbook.xlsx.writeFile(path);
  }

  async readFileToGetCoordinates(
    worksheet: ExcelJS.Worksheet,
    searchText: string,
  ): Promise<{ rowNumber: number; columnNumber: number }> {
    let rowOutput: number = 0;
    let colOutput: number = 0;

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value == searchText) {
          rowOutput = rowNumber;
          colOutput = colNumber;
          console.log(
            `Found "${cell.value}" at Row ${rowNumber}, Column ${colNumber}`,
          );
        }
      });
    });
    if (rowOutput === 0 || colOutput === 0) {
      return { rowNumber: 0, columnNumber: 0 };
    }
    return { rowNumber: rowOutput, columnNumber: colOutput };
  }
}
