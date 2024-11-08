import { templateAssignmentColon } from "~ops/template/assignment/colon";

export const resolveTypeDeclaration = <
  T extends string
>(
  name: T
) => templateAssignmentColon("", name);
