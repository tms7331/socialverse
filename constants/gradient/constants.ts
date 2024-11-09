import { LIGHT_LOGO } from '@/constants/color';
import { TValues } from '@/types/gradients';
import { resolveBoxBackground } from '@/utils/box';
import { boxBorderCss } from '@/utils/css/border/css';
import { resolveGradient } from '@/utils/resolveGradient';

export const LINEAR_GRADIENT_SVG_ID = 'linear-gradient-blue-pink-yellow-svg';

export const GRADIENT_TEAL_YELLOW_PINK_COLORS = [
  ...(Object.values(LIGHT_LOGO) as TValues<typeof LIGHT_LOGO>)
] as const;

const resolveMirror = (half: any[]) =>
  [...half.slice(1), ...half.reverse().slice(1)] as const;

export const LIGHT_COLORS = resolveMirror([
  ...GRADIENT_TEAL_YELLOW_PINK_COLORS
]);

export const GRADIENT_TEAL_YELLOW_PINK = resolveGradient({
  name: 'linear-gradient',
  parts: ['to left top', ...GRADIENT_TEAL_YELLOW_PINK_COLORS]
});

export const RADIAL_TEAL_YELLOW_PINK = resolveGradient({
  name: 'radial-gradient',
  parts: ['circle at 100%', ...GRADIENT_TEAL_YELLOW_PINK_COLORS]
});

export const GRADIENT_BORDER_COMMON = {
  ...boxBorderCss({
    width: '2px',
    style: 'solid',
    imageSlice: 1
  })
};

export const GRADIENT_TEXT_COMMON = {
  ...resolveBoxBackground({
    size: '100% 100%'
  }),
  '-webkit-background-clip': 'text',
  '-webkit-text-stroke': '2px transparent'
};

const FADE_100_05 = 'hsla(0, 0%, 100%, 0.5)';
const TRANSPARENT = 'hsla(0, 0%, 0%, 0)';

const POSITIONS = [
  ['50% 0%', '8% 50%'],
  ['50% 100%', '12% 50%'],
  ['0% 50%', '50% 7%'],
  ['100% 50%', '50% 5%']
] as const;

export const GRADIENT_MESH_LIGHT_CSS = {
  backgroundImage: resolveGradient({
    name: 'repeating-radial-gradient',
    parts: ['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.5)']
  }),
  backgroundSize: '6px 6px'
};
