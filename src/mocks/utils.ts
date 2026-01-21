import { FilterValue } from "@features/Filter/Filter.types";
import { parseDateString } from "@features/Filter/utils";
import { TPaginationTable } from "@shared/ui/TableSort/components/Pagination.types";

const singleDateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
const multiDateRegex = /^\d{2}\.\d{2}\.\d{4} - \d{2}\.\d{2}\.\d{4}$/;

export const filterFunc = (tableData, filters: FilterValue) => {
  tableData = tableData.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      const itemValue = item[key];
      if (value === "") return true;
      if (typeof value === "string" && value.match(singleDateRegex)) {
        const tableDate = itemValue;
        const filterDate = value.split(".").reverse().join("-");
        return tableDate === filterDate;
      }

      //Формат данты в приходящем сообщение - 01.01.2026 - 15.01.2026
      if (typeof value === "string" && value.match(multiDateRegex)) {
        const [dateFrom, dateTo] = value
          .split("-")
          .map((s) => parseDateString(s?.trim()));

        // Формат данты в БД - 2023-01-01
        const tableDate = parseDateString(itemValue);

        if (!dateFrom || !dateTo || !tableDate) return true;

        if (dateFrom < tableDate && dateTo > tableDate) {
          return true;
        }
        return false;
      }

      // Пропускаем пустые фильтры
      if (value === null || value === undefined) {
        return true;
      }

      // Фильтр по диапазону
      if (typeof value === "object" && "min" in value && "max" in value) {
        if (typeof itemValue === "number") {
          return itemValue >= value.min && itemValue <= value.max;
        }
        return false;
      }

      // Фильтр по массиву значений
      if (Array.isArray(value) && typeof itemValue === "string") {
        return value.includes(itemValue);
      }

      // Простое сравнение для строк и чисел
      return itemValue === value;
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
      data: arr.slice(0, 10),
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
