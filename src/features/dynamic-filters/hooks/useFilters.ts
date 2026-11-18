import { hasFilledFilter } from "../lib/hasFilledFilter";
import { TFilterValue } from "../model/DynamicFilters.types";
import { useFiltersStore } from "../model/filtersStore";
import { resolvePageNavigation } from "@shared/lib";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Первый сегмент пути: `/requests/1/history` → `requests`. На главной сегмента нет. */
export const filterSectionId = (pathname: string) =>
  pathname.split("/")[1] || null;

export const useFilters = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pageId = filterSectionId(pathname);
  const page = useFiltersStore((state) =>
    pageId ? state.pages[pageId] : undefined,
  );
  const [tableKey, setTableKey] = useState(0);

  const bumpTable = useCallback(() => {
    setTableKey((prev) => prev + 1);
  }, []);

  const handleApplyFilters = useCallback(
    (newFilters: TFilterValue, variant?: string) => {
      if (!pageId) return;
      useFiltersStore.getState().applyFilters(pageId, newFilters, variant);
      bumpTable();
    },
    [bumpTable, pageId],
  );

  const handleCloseFilters = useCallback(() => {
    if (!pageId) return;

    if (!hasFilledFilter(page?.filters)) {
      const back = resolvePageNavigation(pathname);
      if (back) {
        navigate(back.to);
        return;
      }
    }

    useFiltersStore.getState().setShowFilters(pageId, false);
  }, [navigate, page?.filters, pageId, pathname]);

  const handleOpenFilters = useCallback(() => {
    if (!pageId) return;
    useFiltersStore.getState().setShowFilters(pageId, true);
  }, [pageId]);

  const handleResetFilters = useCallback(() => {
    if (!pageId) return;
    useFiltersStore.getState().resetFilters(pageId);
    bumpTable();
  }, [bumpTable, pageId]);

  const handleRemoveField = useCallback(
    (id: string) => {
      if (!pageId) return;
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
