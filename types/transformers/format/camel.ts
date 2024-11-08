import { TTCamelToPascal } from "@/types/transformers/format/pascal";

export type TTKebabToCamel<
  T extends string,
  A extends string = ''
> = T extends `${infer F}${infer R}`
  ? TTKebabToCamel<
      F extends '-' ? Capitalize<R> : R,
      `${A}${F extends `-` ? '' : F}`
    >
  : A;

export type TTPascalToCamel<T extends string> =
  T extends `${infer F}${infer R}`
    ? `${Lowercase<F>}${R}`
    : never;

export type TObjectToCamelCase<T> = {
  [Prop in keyof T as TTCamelToPascal<
    Prop & string
  >]: T[Prop];
};

