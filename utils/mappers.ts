export type TRequireOnlyOne<
  T,
  Keys extends keyof T = keyof T,
> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<
      Pick<T, K>
    > &
      Partial<
        Record<
          Exclude<Keys, K>,
          undefined
        >
      >;
  }[Keys];

export type TRequireAtLeastOne<
  T,
  Keys extends keyof T = keyof T,
> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<
      Pick<T, K>
    > &
      Partial<
        Pick<T, Exclude<Keys, K>>
      >;
  }[Keys];

export type TMapped<
  N extends number,
  Result extends Array<unknown> = [],
> = Result['length'] extends N
  ? Result
  : TMapped<
      N,
      [...Result, Result['length']]
    >;
