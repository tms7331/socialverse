export const symmetryLine = <
  T extends string,
  S extends string,
>(
  v: T,
  s: S,
) => `${s}${v}${s}` as const;
