declare const brand: unique symbol;

type Brand<T, Name extends string> = T & { readonly [brand]?: Name };

declare global {
  type UUID = Brand<string, "UUID">;
  type IsoDate = Brand<string, "IsoDate">;
  type IsoDateTime = Brand<string, "IsoDateTime">;
}

export {};
