import {
  GRADIENT_TYPES,
  ANGLE_TYPES,
  RADIAL_SHAPES,
  RADIAL_EXTENTS
} from '@/constants/gradient';
import { TNumberPercentValue } from '@/types/numbers';
import { TStrRecord } from '@/types/shapes';

export type TValues<T extends TStrRecord> = T[keyof T][];

type TColor = string;
export type TColorStop =
  | [color: TColor, ...stops: TNumberPercentValue[]]
  | TColor;
export type TColorStops = TColorStop[];
type TGradientTypes = typeof GRADIENT_TYPES;
type TGradientType = TGradientTypes[number];

type TGradientName<T extends TGradientType> = `${
  | T
  | `repeating-${T}`}-gradient`;

type TGradientAngleType = (typeof ANGLE_TYPES)[number];
export type TGradientAngle = `${number}${TGradientAngleType}`;
type TGradientSideOrCorner = string;
export type TGradientDirection = `to ${TGradientSideOrCorner}`;
type TGradientPosition = `at ${string}`;
type TLinearGradientParts =
  | [TGradientAngle | TGradientDirection, ...TColorStops]
  | TColorStops;

type TRadialGradientShape = (typeof RADIAL_SHAPES)[number];
type TRadialGradientExtent = (typeof RADIAL_EXTENTS)[number];
type TRadialForm = TRadialGradientShape | TRadialGradientExtent;
type TRadialGradientParts =
  | [TRadialForm, TRadialForm, TGradientPosition, ...TColorStops]
  | [TRadialForm, TGradientPosition, ...TColorStops]
  | [TGradientPosition, ...TColorStops]
  | [TRadialForm, TRadialForm, ...TColorStops]
  | [TRadialForm, ...TColorStops]
  | TColorStops;

type TFromAngle = `from ${TGradientAngle}`;
type TConicGradientParts =
  | [TFromAngle, TGradientPosition, ...TColorStops]
  | [TGradientPosition, ...TColorStops]
  | TColorStops;

type TGradientPartsRecord = {
  linear: TLinearGradientParts;
  radial: TRadialGradientParts;
  conic: TConicGradientParts;
};
export type TGradientConfig<T extends TGradientType> = {
  name: TGradientName<T>;
  parts: TGradientPartsRecord[T];
};

export type TLinearGradientConfig = TGradientConfig<'linear'>;

export type TRadialGradientConfig = TGradientConfig<'radial'>;

export type TConicGradientConfig = TGradientConfig<'conic'>;

export type UGradientConfig =
  | TLinearGradientConfig
  | TRadialGradientConfig
  | TConicGradientConfig;
