import { endTemplateArray } from "~ops/template/array/end";
import { initTemplateArray } from "~ops/template/array/start";
import { resolveTemplateItems } from "~ops/template/item";

export const templateArray = (
  name: string,
  items: (object | string)[]
) =>
  [
    initTemplateArray(name),
    resolveTemplateItems(items),
    endTemplateArray(),
    ''
  ].join("\n");
