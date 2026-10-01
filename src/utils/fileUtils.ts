import fs from "fs";

export class FileUtils {
  constructor() {}

  async pathExists(path: string) {
    return fs.existsSync(path);
  }

  async deleteFileIfExists(path: string) {
    if (await this.pathExists(path)) {
      fs.unlinkSync(path);
    }
  }
}
