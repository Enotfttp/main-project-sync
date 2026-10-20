import { TFilterValue } from "../model/DynamicFilters.types";
import { useCallback, useState } from "react";

export const handleSetFilters = (
  newFilters: TFilterValue,
  prevState?: TFilterValue,
) => ({ ...prevState, ...newFilters });

export const useFilters = () => {
  const [variant, setVariant] = useState<string | undefined>();
  const [filters, setFilters] = useState<TFilterValue>();
  const [tableKey, setTableKey] = useState(0); // Для принудительного обновления таблицы
  const [isShowFilters, setIsShowFilters] = useState(true); // Для принудительного обновления таблицы

  const handleApplyFilters = useCallback(
    (newFilters: TFilterValue, variant?: string) => {
      setFilters((prevState) => handleSetFilters(newFilters, prevState));
      setVariant(variant);
      // Обновляем ключ таблицы чтобы она пересоздалась
      setTableKey((prev) => prev + 1);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setIsShowFilters(false);
  }, []);
  const handleOpenFilter = useCallback(() => {
    setIsShowFilters(true);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(undefined);
    setTableKey((prev) => prev + 1);
  }, []);

  const handleRemoveField = useCallback((id: string) => {
    setFilters((prev) => {
      const nextFilters = { ...prev };
      delete nextFilters[id];
      return nextFilters;
    });
    setTableKey((prev) => prev + 1);
  }, []);

  return {
    filters,
    tableKey,
    isShowFilters,
    variant,
    setIsShowFilters,
    handleApplyFilters,
    handleResetFilters,
    handleRemoveField,
    setFilters,
    handleClose,
    handleOpenFilter,
  };
};
