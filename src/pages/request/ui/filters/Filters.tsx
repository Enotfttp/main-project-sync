import { filterVariants } from "../../lib/filters";
import { DynamicFilters, TFilterValue } from "@features/dynamic-filters";
import React from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: TFilterValue, variant?: string) => void;
  onResetFilters: () => void;
  onCancel: () => void;
  isShowFilters: boolean;
  filtersValue?: TFilterValue;
}

export const Filter: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
  onCancel,
  isShowFilters,
  filtersValue,
}) => {
  const handleApply = (filterValues: TFilterValue, variant?: string) => {
    onApplyFilters(filterValues, variant);
  };

  return (
    <DynamicFilters
      isShowFilters={isShowFilters}
      variants={filterVariants}
      filtersValue={filtersValue}
      onCancel={onCancel}
      onReset={onResetFilters}
      onApply={handleApply}
    />
  );
};
