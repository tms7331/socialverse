import { TBoxVariant, TCssBoxTailKey, TCssBoxBorderTailKey, TCssBoxBackgroundTailKey } from "@/types/background";
import { TTPascalToCamel } from "@/types/transformers/format/camel";

export const resolveBoxCssKey = <T extends TBoxVariant>(
  variant: T,
  tail: TCssBoxTailKey<T>
): `${T}${TCssBoxTailKey<T>}` => {
  const key = `${variant}${tail}` as const;
  return key;
};

export const resolveBoxCssBorderKey = (
  tail: TCssBoxBorderTailKey
) => {
  const key = resolveBoxCssKey('border', tail);
  return key;
};

export const resolveBoxCssBackgroundKey = (
  tail: TCssBoxBackgroundTailKey
) => {
  const key = resolveBoxCssKey('background', tail);
  return key;
};

const pascalToCamel = <T extends string>(key: T) =>
  key.replace(/^./, (v) =>
    v.toLowerCase()
  ) as TTPascalToCamel<T>;

export const resolveBoxBorderKey = (
  tail: TCssBoxBorderTailKey
) => {
  let key = resolveBoxCssBorderKey(tail);
  key = pascalToCamel(key);
  return key;
};

export const resolveBoxBackgroundKey = (
  tail: TCssBoxBackgroundTailKey
) => {
  const key = resolveBoxCssBackgroundKey(tail);
  return pascalToCamel(key);
};
