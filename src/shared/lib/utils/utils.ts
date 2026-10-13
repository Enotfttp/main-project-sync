export function additionalHover<T>(arr?: T[]): T[] | [] {
  return arr?.length ? arr.map((item) => ({ ...item, hover: true })) : [];
}

export function addIdTableRowData<T, K extends keyof T>(
  field: K,
  arr?: T[],
): Array<T & { id: T[K] }> | [] {
  return arr?.length ? arr.map((item) => ({ ...item, id: item[field] })) : [];
}
