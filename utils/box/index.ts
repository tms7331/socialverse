import {
  TBoxVariant,
  TBoxCommonConfig,
  TBoxBorderConfig,
  TBoxBackgroundConfig
} from '@/types/background';
import { TTCamelToPascal } from '@/types/transformers/format/pascal';
import { resolveBoxCssKey } from '@/utils/box/keys';
import { camelToPascal } from '@/utils/css/format';

const resolveCommon = (
  variant: TBoxVariant,
  config: TBoxCommonConfig<typeof variant>
) => ({
  [resolveBoxCssKey(variant, 'Image')]: config['image'],
  [resolveBoxCssKey(variant, 'Color')]: config['color']
});

export const resolveBoxBorder = ({
  image,
  color,
  ...config
}: TBoxBorderConfig) => {
  type TFromKey = Extract<keyof typeof config, string>;
  type TToKey = `${typeof variant}${TTCamelToPascal<TFromKey>}`;
  type TValue = any; // (typeof config)[TToKey];

  const variant: TBoxVariant = 'border';
  const keys = Object.keys(config) as TFromKey[];
  const result = keys.reduce(
    (a, c: TFromKey) => {
      const key: TToKey = `${variant}${camelToPascal(c)}` as const;
      const value: TValue = config[c];
      a[key] = value;
      return a;
    },
    {} as Record<TToKey, TValue>
  );
  return {
    ...result,
    ...resolveCommon(variant, { image, color })
  };
};

export const resolveBoxBackground = ({
  image,
  color,
  ...config
}: TBoxBackgroundConfig) => {
  const variant = 'background' as const;
  type TFromKey = Extract<keyof typeof config, string>;
  type TToKey = `${typeof variant}${TTCamelToPascal<TFromKey>}`;
  type TValue = any; //(typeof config)[TFromKey];
  const keys = Object.keys(config) as TFromKey[];
  const result = keys.reduce(
    (a, c: TFromKey) => {
      const key: TToKey = `${variant}${camelToPascal(c)}` as const;
      const value: TValue = config[c];
      a[key] = value;
      return a;
    },
    {} as Record<TToKey, TValue>
  );
  return {
    ...result,
    ...resolveCommon(variant, { image, color })
  };
};
