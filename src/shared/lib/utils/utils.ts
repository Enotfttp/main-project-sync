import { FilterVariant, IRenderField } from "@features/dynamic-filters";

export function additionalHover<T>(arr?: T[]): T[] | [] {
  return arr?.length ? arr.map((item) => ({ ...item, hover: true })) : [];
}

export function addIdTableRowData<T, K extends keyof T>(
  field: K,
  arr?: T[],
): Array<T & { id: T[K] }> | [] {
  return arr?.length ? arr.map((item) => ({ ...item, id: item[field] })) : [];
}

export const getFieldsFromMutlyFilters = (
  filterVariants: FilterVariant[],
  variant?: string,
): IRenderField[] => {
  if (!variant) return filterVariants[0].fields;

  return filterVariants.find((el) => el.label === variant)!.fields;
};
