import fs from "node:fs/promises";
import path from "node:path";

export const deleteFilesFromDir =
  async (dirPath: string) => {
    for (const file of await fs.readdir(
      dirPath
    )) {
      await fs.unlink(
        path.join(dirPath, file)
      );
    }
  };
