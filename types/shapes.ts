type TRecord<T> =  Record<string, T>;
export type TStrRecord = TRecord<string>;
export type TPxRecord = TRecord<`${string}px`>
export type TPxEntry = [string, `${string}px`]
export type TPxEntries = TPxEntry[]
export type TIntRecord = TRecord<number>;
export type TAnyRecord = TRecord<any>;

export type TKey<T extends object> = Extract<keyof T, string>;
export type TKeys<T extends object> = readonly TKey<T>[];

export type TValue<T extends object> = T[TKey<T>];

export type TEntry<T extends object> = [TKey<T>, TValue<T>];
export type TEntries<T extends object> = TEntry<T>[];
