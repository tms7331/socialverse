import { TBoxBackgroundConfig } from '@/types/background';
import { boxBackgroundCss } from '@/utils/css/background/css';
import { formatCss } from '@/utils/css/format';

export const boxBackgroundCssStr = <T extends TBoxBackgroundConfig>(
  config: T
) => {
  const result = boxBackgroundCss<T>(config);
  const str = formatCss(result);
  return str;
};
