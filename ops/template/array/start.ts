import { titleToUpperSnake } from "@brysonandrew/utils-format";
import { MODULE_DECLARATIONS } from "~ops/template/declarations/constants";

export const initTemplateArray = (
  name: string
) =>
  `${MODULE_DECLARATIONS["export const"]} ${titleToUpperSnake(
    name
  )} = [
`;
