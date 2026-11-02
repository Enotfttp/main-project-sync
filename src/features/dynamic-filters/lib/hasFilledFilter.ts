import { TFilterValue } from "../model/DynamicFilters.types";
import { TValue } from "../model/RenderFields.types";

export const isFilledFilterValue = (
  value: TValue | undefined,
): value is Exclude<TValue, null> => {
  if (value == null) return false;
  if (typeof value === "string") return value.trim() !== "";
  if (typeof value === "number" || typeof value === "boolean") return true;
  if (value instanceof Date) return !Number.isNaN(value.getTime());
  if (Array.isArray(value)) return value.some(isFilledFilterValue);
  if (typeof value === "object") {
    return Object.values(value).some((item) => item != null);
  }

  return false;
};

export const hasFilledFilter = (filters?: TFilterValue) =>
  Object.values(filters ?? {}).some(isFilledFilterValue);
