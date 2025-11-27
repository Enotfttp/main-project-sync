import { filterFields } from "./filter";
import { Filter } from "@shared/ui";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import React, { useCallback } from "react";

interface FilterSectionProps {
  onApplyFilters: (filters: FilterValue[]) => void;
  onResetFilters: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  onApplyFilters,
  onResetFilters,
}) => {
  const handleApply = (filterValues: FilterValue[]) => {
    onApplyFilters(filterValues);
  };

  const handleReset = useCallback(() => {
    onResetFilters();
  }, [onResetFilters]);

  return (
    <Filter fields={filterFields} onApply={handleApply} onReset={handleReset} />
  );
};
