import { TAssignmentDelimiter } from "~ops/template/assignment/delimiter";

export const templateAssignment = <
  N extends string,
  D extends TAssignmentDelimiter,
  V extends string
>(
  name: N,
  delimiter: D,
  value: V
) =>
  `${name}${delimiter}${value}` as const;
