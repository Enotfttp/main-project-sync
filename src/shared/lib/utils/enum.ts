export const keysOf = <T extends object>(record: T) =>
  Object.keys(record) as Array<keyof T & string>;

export const valuesOf = <T extends object>(record: T) =>
  Object.values(record) as Array<T[keyof T]>;
