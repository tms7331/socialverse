import { TBoxBorderConfig } from "@/types/background";
import { boxBorderCss } from "@/utils/css/border/css";
import { formatCss } from "@/utils/css/format";


export const boxBorderCssStr = <T extends TBoxBorderConfig>(
  config: T
) => {
  const result = boxBorderCss(config);
  const str = formatCss(result);
  return str;
};
