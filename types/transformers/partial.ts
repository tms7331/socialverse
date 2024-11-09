export type TTDeepPartial<T> = T extends object ? {
  [P in keyof T]?: TTDeepPartial<T[P]>;
} : T;