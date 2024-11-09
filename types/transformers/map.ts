export type TTReplace<T, From, To> =
  T extends (...args: any[]) => any
    ? T
    : {
        [K in keyof T]: [
          T[K],
          From,
        ] extends [From, T[K]]
          ? To
          : TTReplace<T[K], From, To>;
      };
