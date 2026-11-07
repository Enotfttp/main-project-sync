import { filters, toPackageFilter } from "../../lib/filters";
import { useFetchPackages } from "@entities/package/api/hook";
import { DynamicFilters, TFilterValue } from "@features/dynamic-filters";
import React from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: TFilterValue, variant?: string) => void;
  onResetFilters: () => void;
  onClose: () => void;
  isShowFilters: boolean;
  filtersValue?: TFilterValue;
  variant?: string;
}

export const Filter: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
  onClose,
  isShowFilters,
  filtersValue,
  variant,
}) => {
  const fetchRequests = useFetchPackages();

  // Закрываем фильтры только после успешного ответа,
  // иначе ошибка показывается в самой форме
  const handleApply = async (
    filterValues: TFilterValue,
    nextVariant?: string,
  ) => {
    await fetchRequests({
      filters: toPackageFilter(filterValues),
    });

    onApplyFilters(filterValues, nextVariant);
    onClose();
  };

  return (
    <DynamicFilters
      isShowFilters={isShowFilters}
      fields={filters}
      filtersValue={filtersValue}
      variant={variant}
      onCancel={onClose}
      onReset={onResetFilters}
      onApply={handleApply}
    />
  );
};
