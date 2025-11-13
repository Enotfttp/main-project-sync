import { useState, useCallback } from 'react';
import { FilterValue } from './Filter.types.ts';

export const useFilter = (initialValues: FilterValue[] = []) => {
  const [filterValues, setFilterValues] = useState<FilterValue[]>(initialValues);

  const updateFilter = useCallback((values: FilterValue[]) => {
    setFilterValues(values);
  }, []);

  const resetFilter = useCallback(() => {
    setFilterValues([]);
  }, []);

  const getFilterValue = useCallback(
    (fieldId: string): FilterValue['value'] => {
      return filterValues.find((v) => v.fieldId === fieldId)?.value ?? null;
    },
    [filterValues],
  );

  const hasActiveFilters = filterValues.length > 0;

  return {
    filterValues,
    updateFilter,
    resetFilter,
    getFilterValue,
    hasActiveFilters,
  };
};
