import { templateAssignment } from "~ops/template/assignment";
import { ASSIGNMENT_DELIMITER } from "~ops/template/assignment/delimiter";

export const templateAssignmentEquals = <
  N extends string,
  V extends string
>(
  name: N,
  value: V
) => templateAssignment(name, ASSIGNMENT_DELIMITER[' = '], value)
