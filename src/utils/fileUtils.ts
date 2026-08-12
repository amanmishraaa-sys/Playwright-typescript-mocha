import fs from "fs";

export class FileUtils {
  constructor() {}

  static async pathExists(path: string) {
    return fs.existsSync(path);
  }

  static async deleteFileIfExists(path: string) {
    if (await this.pathExists(path)) {
      fs.unlinkSync(path);
    }
  }
}
