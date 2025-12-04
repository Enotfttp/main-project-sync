import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";

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

export const paginationFunc = <T>(arr: T[], pagination?: TPaginationTable) => {
  const totalItems = arr.length || 0;
  // Если пагинация не нужна или нет данных - возвращаем всё
  if (!pagination || totalItems === 0) {
    return {
      pagination: {
        page: 1,
        pageSize: 10,
        pageSizes: [10, 25, 50, 100],
        totalItems,
        totalPages: 1,
      },
      data: arr,
    };
  }

  const page = Math.max(1, pagination.page || 1);

  const pageSize = Math.max(1, pagination.pageSize || 10);

  // Вычисляем стандартные размеры страниц
  const pageSizes = [10, 25, 50, 100];

  // Вычисляем offset (смещение) на основе page и pageSize
  const offset = (page - 1) * pageSize;

  // Вычисляем индексы для среза массива
  const startIndex = Math.min(offset, totalItems);
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  // // Вычисляем общее количество страниц
  // const totalPages = Math.ceil(totalItems / pageSize);

  // Получаем данные для текущей страницы
  const paginatedData = arr.slice(startIndex, endIndex);

  return {
    pagination: {
      page, // Текущая страница
      pageSize, // Размер текущей страницы
      pageSizes, // Доступные размеры страниц
      totalItems, // Всего элементов
    },
    data: paginatedData,
  };
};
