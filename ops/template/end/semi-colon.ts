export const endSemiColon = <
  T extends string
>(
  content: T
) => {
  return `${content};\n` as const;
};
