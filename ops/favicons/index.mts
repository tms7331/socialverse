import { favicons } from "favicons";
import fs from "fs/promises";
import path from "path";
import prettier from "prettier";
import { green } from "../display";
import { loading } from "../display/loading";
import { counter } from "../display/counter";
import {
  FAVICONS_ASSET_DEST,
  FAVICONS_CONFIGURATION,
  FAVICONS_SHELL_DIR,
  FAVICONS_HTML_DEST,
  FAVICONS_SOURCE,
  FAVICONS_SHELL_BASENAME,
} from "./config";
import { resolveFaviconsComponent } from "./template";

let interval: null | NodeJS.Timeout = null;

try {
  interval = loading();
  const response = await favicons(FAVICONS_SOURCE, FAVICONS_CONFIGURATION);
  await fs.mkdir(FAVICONS_HTML_DEST, {
    recursive: true,
  });
  await fs.mkdir(FAVICONS_ASSET_DEST, {
    recursive: true,
  });
  await Promise.all(
    response.images.map(async (image) => {
      if (image) {
        // console.log(
        //   green(
        //     `processing ${image.name}...`
        //   )
        // );
        counter();

        await fs.writeFile(
          path.join(FAVICONS_ASSET_DEST, image.name),
          image.contents,
        );
      }
    }),
  );
  await Promise.all(
    response.files.map(async (file) => {
      if (file) {
        // console.log(
        //   green(
        //     `processing ${file.name}...`
        //   )
        // );
        counter();
        await fs.writeFile(
          path.join(FAVICONS_ASSET_DEST, file.name),
          file.contents,
        );
      }
    }),
  );
  // process.stdout.write(
  //   green(
  //     `processing ${HTML_BASENAME}...`
  //   )
  // );
  counter();
  const rows = response.html.map((v) => `${v.slice(0, -1)}/>`);
  const children = rows.join("\n");
  const file = resolveFaviconsComponent(children);
  const formattedFile = await prettier.format(file, {
    parser: "typescript",
  });
  const filePath = path.join(FAVICONS_SHELL_DIR, FAVICONS_SHELL_BASENAME);
  console.log(
    green(
      `
      Writing favicon component to path ${filePath}`,
    ),
  );
  await fs.writeFile(filePath, formattedFile);
  clearInterval(interval);

  console.log(
    green(`
——————————————————————`),
  );
  console.log(
    green(
      `
[${response.images.length}] images created.`,
    ),
  );
  console.log(green(`[${response.files.length}] files created.`));
  console.log(
    green(`html file with [${response.html.length}] html entries created.`),
  );
  // console.log(response.images); // Array of { name: string, contents: <buffer> }
  // console.log(response.files); // Array of { name: string, contents: <string> }
  // console.log(response.html); // Array of strings (html elements)
} catch (error) {
  console.log(error); // Error description e.g. "An unknown error has occurred"
} finally {
  if (interval) {
    clearInterval(interval);
  }
}
