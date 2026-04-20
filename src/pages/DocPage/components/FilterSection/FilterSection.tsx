import { filterFields } from "./filter";
import { FilterValue } from "@features/Filter/Filter.types";
import { Filter } from "@features/index";
import React, { useCallback } from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: FilterValue) => void;
  onResetFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
}) => {
  const handleApply = (filterValues: FilterValue) => {
    onApplyFilters(filterValues);
  };

  const handleReset = useCallback(() => {
    onResetFilters();
  }, [onResetFilters]);

  return (
    <Filter
      isVisibleAdditionalBlock
      fields={filterFields}
      onApply={handleApply}
      onReset={handleReset}
    />
  );
};
