import { filterVariants } from "../../lib/filters";
import { DynamicFilters, TFilterValue } from "@features/dynamic-filters";
import React, { useCallback } from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: TFilterValue, variant?: string) => void;
  onResetFilters: () => void;
  onCancel: () => void;
  isShowFilters: boolean;
}

export const Filter: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
  onCancel,
  isShowFilters,
}) => {
  const handleApply = (filterValues: TFilterValue, variant?: string) => {
    onApplyFilters(filterValues, variant);
  };

  const handleReset = useCallback(() => {
    onResetFilters();
  }, [onResetFilters]);

  return (
    <DynamicFilters
      isShowFilters={isShowFilters}
      variants={filterVariants}
      onCancel={onCancel}
      onReset={handleReset}
      onApply={handleApply}
    />
  );
};
