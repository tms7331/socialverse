import { BRACES_SQUARE } from "~ops/template/operators";
import { symmetryRotational } from "~ops/template/symmetry/rotational";

export const symmetryBracesSquare = <
  T extends string
>(
  v: T
) =>
  symmetryRotational<
    T,
    (typeof BRACES_SQUARE)["open"],
    (typeof BRACES_SQUARE)["closed"]
  >(
    v,
    BRACES_SQUARE["open"],
    BRACES_SQUARE["closed"]
  );
