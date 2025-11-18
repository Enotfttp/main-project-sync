import { FilterValue } from "./Filter.types";

export const buildQueryString = (filters: FilterValue[]): string => {
  const params = new URLSearchParams();

  filters.forEach((filter) => {
    if (filter.value !== null && filter.value !== undefined) {
      if (Array.isArray(filter.value)) {
        filter.value.forEach((val) =>
          params.append(filter.fieldId, val.toString()),
        );
      } else if (
        typeof filter.value === "object" &&
        "min" in filter.value &&
        "max" in filter.value
      ) {
        // Для диапазона сохраняем min и max как отдельные параметры
        if (filter.value.min !== undefined) {
          params.append(`${filter.fieldId}_min`, filter.value.min.toString());
        }
        if (filter.value.max !== undefined) {
          params.append(`${filter.fieldId}_max`, filter.value.max.toString());
        }
      } else {
        params.append(filter.fieldId, filter.value.toString());
      }
    }
  });

  return params.toString();
};

// Универсальный тип для данных с произвольными ключами
type DataRecord = Record<string, string | number | boolean | Date | null>;

export const filterData = <T extends DataRecord>(
  data: T[],
  filters: FilterValue[],
): T[] => {
  return data.filter((item) => {
    return filters.every((filter) => {
      const itemValue = item[filter.fieldId];

      if (filter.value === null || filter.value === undefined) {
        return true;
      }

      // Для текстового поиска
      if (typeof filter.value === "string") {
        const stringValue = itemValue?.toString().toLowerCase() || "";
        return stringValue.includes(filter.value.toLowerCase());
      }

      // Для числового диапазона
      if (
        typeof filter.value === "object" &&
        "min" in filter.value &&
        "max" in filter.value
      ) {
        const numericValue =
          typeof itemValue === "number" ? itemValue : Number(itemValue);
        if (isNaN(numericValue)) return false;

        const min = filter.value.min ?? -Infinity;
        const max = filter.value.max ?? Infinity;
        return numericValue >= min && numericValue <= max;
      }

      // Для мультиселекта
      if (Array.isArray(filter.value)) {
        return filter.value.includes(itemValue as string);
      }

      // Для булевых значений
      if (typeof filter.value === "boolean") {
        return Boolean(itemValue) === filter.value;
      }

      // Для точного совпадения (числа, даты и т.д.)
      return itemValue === filter.value;
    });
  });
};
