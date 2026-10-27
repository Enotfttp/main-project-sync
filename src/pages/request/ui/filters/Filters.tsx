import { filterVariants } from "../../lib/filters";
import { useFetchRequests } from "@entities/request/api/hook";
import {
  DynamicFilters,
  handleSetFilters,
  TFilterValue,
} from "@features/dynamic-filters";
import React from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: TFilterValue, variant?: string) => void;
  onResetFilters: () => void;
  onClose: () => void;
  isShowFilters: boolean;
  filtersValue?: TFilterValue;
}

export const Filter: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
  onClose,
  isShowFilters,
  filtersValue,
}) => {
  const fetchRequests = useFetchRequests();

  // Закрываем фильтры только после успешного ответа,
  // иначе ошибка показывается в самой форме
  const handleApply = async (filterValues: TFilterValue, variant?: string) => {
    await fetchRequests({
      filters: handleSetFilters(filterValues, filtersValue),
    });

    onApplyFilters(filterValues, variant);
    onClose();
  };

  return (
    <DynamicFilters
      isShowFilters={isShowFilters}
      variants={filterVariants}
      filtersValue={filtersValue}
      onCancel={onClose}
      onReset={onResetFilters}
      onApply={handleApply}
    />
  );
};
