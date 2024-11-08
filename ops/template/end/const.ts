export const templateEndConst = <
  T extends string
>(
  content: T
) => {
  return `${content} as const;\n`;
};
