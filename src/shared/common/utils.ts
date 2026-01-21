import { FilterValue } from "@features/Filter/Filter.types";

export function uid(): string {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    "",
  );
}

export function additionalHover<T>(arr?: T[]): T[] | [] {
  return arr?.length ? arr.map((item) => ({ ...item, hover: true })) : [];
}

export const isRangeValue = (
  value: FilterValue["value"],
): value is { min: number; max: number } => {
  return (
    typeof value === "object" &&
    value !== null &&
    "min" in value &&
    "max" in value
  );
};
