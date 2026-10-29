import { TFilterValue } from "../model/DynamicFilters.types";
import { useFiltersStore } from "../model/filtersStore";
import { useCallback, useState } from "react";

export const useFilters = (pageId: string) => {
  const page = useFiltersStore((state) => state.pages[pageId]);
  const [tableKey, setTableKey] = useState(0);

  const bumpTable = useCallback(() => {
    setTableKey((prev) => prev + 1);
  }, []);

  const handleApplyFilters = useCallback(
    (newFilters: TFilterValue, variant?: string) => {
      useFiltersStore.getState().applyFilters(pageId, newFilters, variant);
      bumpTable();
    },
    [bumpTable, pageId],
  );

  const handleCloseFilters = useCallback(() => {
    useFiltersStore.getState().setShowFilters(pageId, false);
  }, [pageId]);

  const handleOpenFilters = useCallback(() => {
    useFiltersStore.getState().setShowFilters(pageId, true);
  }, [pageId]);

  const handleResetFilters = useCallback(() => {
    useFiltersStore.getState().resetFilters(pageId);
    bumpTable();
  }, [bumpTable, pageId]);

  const handleRemoveField = useCallback(
    (id: string) => {
      useFiltersStore.getState().removeField(pageId, id);
      bumpTable();
    },
    [bumpTable, pageId],
  );

  return {
    filters: page?.filters,
    tableKey,
    isShowFilters: page?.isShowFilters ?? true,
    variant: page?.variant,
    handleApplyFilters,
    handleResetFilters,
    handleRemoveField,
    handleCloseFilters,
    handleOpenFilters,
  };
};
