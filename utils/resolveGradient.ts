import { UGradientConfig } from "@/types/gradients";

type TConfig = UGradientConfig;
export const resolveGradient = ({
  name,
  parts,
}: TConfig) => {
  if (!Array.isArray(parts)) return '';
  const flatParts = parts.flat(Infinity);
  const syntax = flatParts.join(', ');
  const value = `${name}(${syntax})`;
  return value;
};
