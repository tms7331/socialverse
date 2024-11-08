
export type TNumberPosPercentValue = `${number}%`;
export type TNumberNegPercentValue = `-${number}%`;
export type TNumberPercentValue =
  | TNumberPosPercentValue
  | TNumberNegPercentValue;

export type TNumberString = number | string;