import { handleSetFilters } from "../lib/setFilters";
import { TFilterValue } from "./DynamicFilters.types";
import { create } from "zustand";

/**
 * Применённые фильтры живут вне страницы: переход на другой маршрут
 * размонтирует её, а значения остаются до перезагрузки вкладки.
 */
export interface PageFilterState {
  filters?: TFilterValue;
  variant?: string;
  isShowFilters: boolean;
}

interface FiltersStore {
  pages: Record<string, PageFilterState>;
  applyFilters: (
    pageId: string,
    filters: TFilterValue,
    variant?: string,
  ) => void;
  resetFilters: (pageId: string) => void;
  removeField: (pageId: string, fieldId: string) => void;
  setShowFilters: (pageId: string, isShowFilters: boolean) => void;
}

const createPageState = (): PageFilterState => ({
  isShowFilters: true,
});

const updatePage = (
  pages: Record<string, PageFilterState>,
  pageId: string,
  patch: (page: PageFilterState) => PageFilterState,
): Record<string, PageFilterState> => ({
  ...pages,
  [pageId]: patch(pages[pageId] ?? createPageState()),
});

export const useFiltersStore = create<FiltersStore>((set) => ({
  pages: {},
  applyFilters: (pageId, filters, variant) =>
    set((state) => ({
      pages: updatePage(state.pages, pageId, (page) => ({
        ...page,
        filters: handleSetFilters(filters, page.filters),
        variant,
      })),
    })),
  resetFilters: (pageId) =>
    set((state) => ({
      pages: updatePage(state.pages, pageId, (page) => ({
        ...page,
        filters: undefined,
      })),
    })),
  removeField: (pageId, fieldId) =>
    set((state) => ({
      pages: updatePage(state.pages, pageId, (page) => {
        const nextFilters = { ...page.filters };
        delete nextFilters[fieldId];

        return { ...page, filters: nextFilters };
      }),
    })),
  setShowFilters: (pageId, isShowFilters) =>
    set((state) => ({
      pages: updatePage(state.pages, pageId, (page) => ({
        ...page,
        isShowFilters,
      })),
    })),
}));
