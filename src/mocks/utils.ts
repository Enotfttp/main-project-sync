export const filterFunc = (tableData, filters) => {
  tableData = tableData.filter((item) => {
    return filters.every((filter) => {
      const itemValue = item[filter?.fieldId];

      if (typeof filter?.value === "string" && filter?.fieldId === "date") {
        const tableDate = itemValue;
        const filterDate = filter?.value.split(".").reverse().join("-");
        return tableDate === filterDate;
      }

      // Пропускаем пустые фильтры
      if (filter?.value === null || filter?.value === undefined) {
        return true;
      }

      // Фильтр по диапазону
      if (
        typeof filter.value === "object" &&
        "min" in filter.value &&
        "max" in filter.value
      ) {
        if (typeof itemValue === "number") {
          return itemValue >= filter.value.min && itemValue <= filter.value.max;
        }
        return false;
      }

      // Фильтр по массиву значений
      if (Array.isArray(filter.value) && typeof itemValue === "string") {
        return filter.value.includes(itemValue);
      }

      // Простое сравнение для строк и чисел
      return itemValue === filter.value;
    });
  });

  return tableData;
};
