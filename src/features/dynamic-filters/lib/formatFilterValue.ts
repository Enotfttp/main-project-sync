import { IRenderField, TValue } from "../model/RenderFields.types";
import { DATE_RANGE_SEPARATOR, normalizedDate } from "@shared/lib";

export const isFilledFilterValue = (
  value: TValue | undefined,
): value is TValue => {
  if (value == null || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;

  return true;
};

const optionLabel = (field: IRenderField, value: string) =>
  field.options?.find((option) => option.value === value)?.label ?? value;

const formatDate = (value: string) => normalizedDate(value);

export const formatFilterValue = (field: IRenderField, value: TValue) => {
  switch (field.type) {
    case "date":
      return typeof value === "string" ? formatDate(value) : "";
    case "date-range":
      return typeof value === "string"
        ? value
            .split(DATE_RANGE_SEPARATOR)
            .map((part) => formatDate(part.trim()))
            .join(DATE_RANGE_SEPARATOR)
        : "";
    case "select":
      return typeof value === "string" ? optionLabel(field, value) : "";
    case "multiselect":
      return Array.isArray(value)
        ? value.map((item) => optionLabel(field, item)).join(", ")
        : "";
    case "boolean":
      return value ? "Да" : "Нет";
    case "range":
      return typeof value === "object" &&
        value !== null &&
        "min" in value &&
        "max" in value
        ? `${value.min} – ${value.max}`
        : "";
    default:
      return String(value);
  }
};
