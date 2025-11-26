import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFilter = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterValue[]>();
  const [tableKey, setTableKey] = useState(0); // Для принудительного обновления таблицы

  const handleApplyFilters = useCallback((newFilters: FilterValue[]) => {
    setFilters(newFilters);
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
