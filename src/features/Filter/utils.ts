import { FilterValue } from "./Filter.types";
import { RenderField } from "../Fields/RenderFields.types";
import { required } from "@shared/utils";

// Универсальный тип для данных с произвольными ключами
type DataRecord = Record<string, string | number | boolean | Date | null>;

export const filterData = <T extends DataRecord>(
  data: T[],
  filters: FilterValue,
): T[] => {
  return data.filter((item) => {
    Object.entries(filters).every(([key, value]) => {
      const itemValue = item[key];

      if (value === null || value === undefined) {
        return true;
      }

      // Для текстового поиска
      if (typeof value === "string") {
        const stringValue = itemValue?.toString().toLowerCase() || "";
        return stringValue.includes(value.toLowerCase());
      }

      // Для числового диапазона
      if (typeof value === "object" && "min" in value && "max" in value) {
        const numericValue =
          typeof itemValue === "number" ? itemValue : Number(itemValue);
        if (isNaN(numericValue)) return false;

        const min = value.min ?? -Infinity;
        const max = value.max ?? Infinity;
        return numericValue >= min && numericValue <= max;
      }

      // Для мультиселекта
      if (Array.isArray(value)) {
        return value.includes(itemValue as string);
      }

      // Для булевых значений
      if (typeof value === "boolean") {
        return Boolean(itemValue) === value;
      }

      // Для точного совпадения (числа, даты и т.д.)
      return itemValue === value;
    });
  });
};

export const parseDateString = (dateStr: string): Date | null => {
  try {
    const [day, month, year] = dateStr.split(".").map(Number);
    if (day && month && year) {
      return new Date(year, month, day);
    }
  } catch {
    return null;
  }
  return null;
};

export const calculateMaxDate = (
  fromDateStr: string,
  dateDifference?: string,
): Date | undefined => {
  const fromDate = parseDateString(fromDateStr);
  if (!fromDate) return;

  const resultDate = new Date(fromDate);

  if (dateDifference) {
    // Обработка временных интервалов из конфига
    if (dateDifference.includes("y")) {
      const years = parseInt(dateDifference.split("y")[0]) || 0;
      resultDate.setFullYear(resultDate.getFullYear() + years);
    }
    if (dateDifference.includes("m")) {
      const months = parseInt(dateDifference.split("m")[0]) || 0;
      resultDate.setMonth(resultDate.getMonth() + months);
    }
    if (dateDifference.includes("d")) {
      const days = parseInt(dateDifference.split("d")[0]) || 0;
      resultDate.setDate(resultDate.getDate() + days);
    }
  }

  return resultDate;
};

export const validate = (values: FilterValue, fields: RenderField[]) => {
  const errors: Partial<RenderField> = {};

  fields.forEach((field) => {
    if (field?.required) {
      errors[field.id] = required(values[field.id]);
    }
  });

  return errors;
};
