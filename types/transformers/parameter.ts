export type TTFirstArg<T extends any[]> = T extends [
  infer R,
  ...any[],
]
  ? R
  : T extends []
  ? undefined
  : never;

export type TTTail<T extends any[]> = ((
  ...args: T
) => any) extends (
  _: infer First,
  ...rest: infer Rest
) => any
  ? T extends any[]
    ? Rest
    : ReadonlyArray<Rest[number]>
  : [];
