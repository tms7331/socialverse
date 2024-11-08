import { QUOTE } from "~ops/template/operators";
import { symmetryLine } from "~ops/template/symmetry/line";

export const symmetryQuote = <
  T extends string
>(
  v: T
) =>
  symmetryLine<T, typeof QUOTE>(
    v,
    QUOTE
  );
