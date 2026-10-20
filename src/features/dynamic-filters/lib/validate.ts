import { TFilterValue } from "../model/DynamicFilters.types";
import { IRenderField } from "@features/dynamic-filters";
import { required } from "@shared/lib";

// Универсальный тип для данных с произвольными ключами
type DataRecord = Record<string, string | number | boolean | Date | null>;

export const filterData = <T extends DataRecord>(
  data: T[],
  filters: TFilterValue,
): T[] => {
  return data.filter((item) =>
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
    }),
  );
};

export const validate = (values: TFilterValue, fields: IRenderField[]) => {
  const errors: Partial<IRenderField> = {};

  fields.forEach((field) => {
    const value = values[field.name];

    if (field?.required) {
      const message = required(value);
      if (message) {
        errors[field.name] = field.errorText || message;
        return;
      }
    }

    const customError = field.validate?.(value, values);
    if (customError) {
      errors[field.name] = customError;
    }
  });

  return errors;
};
