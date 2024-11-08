import { TTCapitalize } from "@/types/transformers/format/capitalize";

export type TTCamelToPascal<T extends string> =
  TTCapitalize<T>;

export type TTKebabToPascal<
  T extends string,
  A extends string = ''
> = T extends `${infer F}${infer R}`
  ? TTKebabToPascal<
      F extends '-' ? Capitalize<R> : R,
      `${A extends '' ? Capitalize<F> : A}${F extends `-`
        ? ''
        : A extends ''
        ? ''
        : F}`
    >
  : A;
