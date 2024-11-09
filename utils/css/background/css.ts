import { TBoxBackgroundConfig } from '@/types/background';
import { TTCamelToKebab } from '@/types/transformers/format/kebab';
import { camelToKebab } from '@/utils/css/format';

export const boxBackgroundColorCss = (
  value: string
) => `background-color: ${value};
`;
export const boxBackgroundImageCss = (
  value: string
) => `background-image: ${value};
`;

export const boxBackgroundCss = <T extends TBoxBackgroundConfig>(config: T) => {
  type TFromKey = Extract<keyof typeof config, string>;
  const keys = Object.keys(config) as TFromKey[];
  type TToKey = `background-${TTCamelToKebab<TFromKey>}`;
  const result = keys.reduce<Record<TToKey, T[TFromKey]>>(
    (a, key: TFromKey) => {
      const kebabTail = camelToKebab<TFromKey>(key);

      const kebabKey: TToKey = `background-${kebabTail}` as const;
      a[kebabKey] = config[key];
      return a;
    },
    {} as Record<TToKey, T[TFromKey]>
  );

  return result;
};
