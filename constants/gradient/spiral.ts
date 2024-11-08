import { boxBackgroundCss } from "@/utils/box";
import { resolveGradient } from "@/utils/resolveGradient";

export const spiral = (ringSize:number) =>
  boxBackgroundCss({
  image: resolveGradient({
    name: "repeating-linear-gradient",
    parts: [
      "rgba(0,0,0,0.1)",
      `rgba(0,0,0,0.2) ${ringSize}px`,
      `transparent ${ringSize}px`,
      `transparent ${
        ringSize * 2
      }px`,
    ],
  }),
});
