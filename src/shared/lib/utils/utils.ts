export function addIdAndHoverTableRowData<T, K extends keyof T>(
  field: K,
  arr?: T[],
  isHover = false,
): Array<T & { id: T[K] }> | [] {
  return arr?.length
    ? arr.map((item) => ({ ...item, id: item[field], hover: isHover }))
    : [];
}
