import { TTPascalToCamel } from '@/types/transformers/format/camel';
import { TRequireAtLeastOne } from '@/utils/mappers';
import { CSSProperties } from 'react';

export type TBoxVariant =
  | 'background'
  // | 'WebkitBackground'
  | 'border';
// | 'WebkitBorder'
// | 'WebkitText';

export type TBoxVariantTail<
  T extends string,
  V extends TBoxVariant = TBoxVariant
> = T extends `${V}${infer R}` ? (R extends '' ? never : R) : never;

type TCssKeys = keyof CSSProperties;

export type TCssBoxTailKey<T extends TBoxVariant> = TBoxVariantTail<
  TCssKeys,
  T
>;

export type TCssBoxBackgroundTailKey = TBoxVariantTail<TCssKeys, 'background'>;
// | TBoxVariantTail<TCssKeys, 'WebkitBackground'>;

export type TBoxBackgroundConfig = {
  size?: CSSProperties['backgroundSize'];
  position?: CSSProperties['backgroundPosition'];
  clip?: CSSProperties['backgroundClip'];
  blendMode?: CSSProperties['backgroundBlendMode'];
  repeat?: CSSProperties['backgroundRepeat'];
  color?: CSSProperties['backgroundColor'];
  image?: CSSProperties['backgroundImage'];
};

export type TBoxBackgroundLookup = Record<
  TCssBoxBackgroundTailKey,
  TCssBoxBackgroundTailKey
>;

export type TCssBoxBorderTailKey = TBoxVariantTail<TCssKeys, 'border'>;
// | TBoxVariantTail<TCssKeys, 'WebkitBorder'>;
export type TBoxBorderConfigKey = TTPascalToCamel<TCssBoxBorderTailKey>;
export type TBoxBorderConfigValue<
  T extends TCssBoxBorderTailKey = TCssBoxBorderTailKey
> = CSSProperties[`border${T}`]; //| CSSProperties[`WebkitBorder${T}`];
export type TBoxBorderConfigAttr<T extends TCssBoxBorderTailKey> = Record<
  TTPascalToCamel<T>,
  TBoxBorderConfigValue<T>
>;
export type TBoxBorderConfigAll = TBoxBorderConfigAttr<TCssBoxBorderTailKey>;

export type TBoxBorderConfig = TRequireAtLeastOne<TBoxBorderConfigAll>;

export type TBoxBorderLookup = Record<
  TCssBoxBorderTailKey,
  TCssBoxBorderTailKey
>;

export type TBoxConfig<T extends TBoxVariant = 'background'> =
  T extends 'background'
    ? TBoxBackgroundConfig
    : T extends 'border'
      ? TBoxBorderConfig
      : never;

export type TBoxCommonConfig<T extends TBoxVariant> = Pick<
  TBoxConfig<T>,
  'color' | 'image'
>;

//   TBoxBorderConfigAttr<'Width'> &
//     TBoxBorderConfigAttr<'Style'> &
//     TBoxBorderConfigAttr<'Color'> &
//     TBoxBorderConfigAttr<'Image'> &
//     TBoxBorderConfigAttr<'ImageSlice'> &
// TBoxBorderConfigAttr<'ImageSlice'> &
// TBoxBorderConfigAttr<'BlockColor'> &
// TBoxBorderConfigAttr<'BlockEndColor'> &
// TBoxBorderConfigAttr<'BlockEndStyle'> &
// TBoxBorderConfigAttr<'BlockEndWidth'> &
// TBoxBorderConfigAttr<'BlockStartColor'> &
// TBoxBorderConfigAttr<'BlockStartStyle'> &
// TBoxBorderConfigAttr<'BlockStartWidth'> &
// TBoxBorderConfigAttr<TCssBoxBorderTailKey>;
