export type TFiltersMSW<T extends object> = {
  [key in keyof T]?: T[key];
};

export type TFiltersBodyMSW<T extends object> = {
  filters?: TFiltersMSW<T>;
};
