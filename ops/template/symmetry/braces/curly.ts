import { BRACES_CURLY } from "~ops/template/operators";
import { symmetryRotational } from "~ops/template/symmetry/rotational";

export const symmetryBracesCurly = <
  T extends string
>(
  v: T
) => {
  const result = symmetryRotational<
    T,
    (typeof BRACES_CURLY)["open"],
    (typeof BRACES_CURLY)["closed"]
  >(
    v,
    BRACES_CURLY["open"],
    BRACES_CURLY["closed"]
  );
  return result;
};
