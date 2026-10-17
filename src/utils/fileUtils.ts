import fs from "fs";

export class FileUtils {
  constructor() {}

  /**
   * To check if a file exists at the specified path.
   * @param path - The path of the file.
   */
  async pathExists(path: string) {
    return fs.existsSync(path);
  }

  /**
   * To delete the file if it exists at the given path.
   * @param path - The path of the file.
   */
  async deleteFileIfExists(path: string) {
    if (await this.pathExists(path)) {
      fs.unlinkSync(path);
    }
  }
}
