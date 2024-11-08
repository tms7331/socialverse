export type TTEnumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N
  ? Acc[number]
  : TTEnumerate<
      N,
      [...Acc, Acc['length']]
    >;

export type TIntRange<
  F extends number,
  T extends number,
> = Exclude<TTEnumerate<T>, TTEnumerate<F>>;

