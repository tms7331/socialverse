export const ASSIGNMENT_DELIMITER = {
  " = ": " = ",
  ": ": ": ",
} as const;

export type TAssignmentDelimiter =
  keyof typeof ASSIGNMENT_DELIMITER;
