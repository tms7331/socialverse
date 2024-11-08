import { endComma } from "~ops/template/end/comma";
import { symmetryQuote } from "~ops/template/symmetry/quote";

type TItem = string | object;
type TItems = TItem[];

export const resolveTemplateItem = (
  item: TItem
) =>
  `${endComma(
    typeof item === "string"
      ? symmetryQuote(item)
      : JSON.stringify(item, null, 2)
  )}
`;

export const resolveTemplateItems = (
  items: TItems
) => items.map(resolveTemplateItem);
