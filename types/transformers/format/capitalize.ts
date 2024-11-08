export type TTCapitalize<T extends string> =
  T extends `${infer F}${infer R}`
    ? `${Capitalize<F>}${R}`
    : never;