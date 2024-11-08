export const symmetryRotational = <
  T extends string,
  S extends string,
  E extends string
>(
  v: T,
  s: S,
  e: E
) => `${s}${v}${e}` as const;
