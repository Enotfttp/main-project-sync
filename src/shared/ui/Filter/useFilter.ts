import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const handleSetFilters = (
  newFilters: FilterValue[],
  prevState?: FilterValue[],
) => {
  const mergedFilters = prevState || [];

  newFilters.forEach((newFilter) => {
    const existingIndex = mergedFilters.findIndex(
      (el) => el.fieldId === newFilter.fieldId,
    );

    if (existingIndex >= 0) {
      mergedFilters[existingIndex] = {
        ...mergedFilters[existingIndex],
        ...newFilter,
      };
    } else {
      mergedFilters.push(newFilter);
    }
  });
  return mergedFilters;
};

export const useFilter = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValue[]>();
  const [tableKey, setTableKey] = useState(0); // Для принудительного обновления таблицы

  const handleApplyFilters = useCallback((newFilters: FilterValue[]) => {
    setFilters((prevState) => handleSetFilters(newFilters, prevState));

    // Обновляем ключ таблицы чтобы она пересоздалась
    setTableKey((prev) => prev + 1);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(undefined);
    setTableKey((prev) => prev + 1);
  }, []);

  const onRowClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  return {
    filters,
    tableKey,
    onRowClick,
    handleApplyFilters,
    handleResetFilters,
    setFilters,
  };
};
