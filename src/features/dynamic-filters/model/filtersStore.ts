import { TFilterValue } from "./DynamicFilters.types";
import { readStoredPages, writeStoredPages } from "../lib/filterStorage";
import { hasFilledFilter } from "../lib/hasFilledFilter";
import { create } from "zustand";

/**
 * Фильтры раздела переживают обновление вкладки и переход вглубь того же
 * раздела. Главная и другой раздел очищают стор.
 * Пустой фильтр всегда открыт.
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
  retainFilters: (pageId: string | null) => void;
  removeField: (pageId: string, fieldId: string) => void;
  setShowFilters: (pageId: string, isShowFilters: boolean) => void;
}

const createPageState = (): PageFilterState => ({
  isShowFilters: true,
});

const normalizePage = (page: PageFilterState): PageFilterState =>
  hasFilledFilter(page.filters) ? page : { ...page, isShowFilters: true };

const updatePage = (
  pages: Record<string, PageFilterState>,
  pageId: string,
  patch: (page: PageFilterState) => PageFilterState,
): Record<string, PageFilterState> => ({
  ...pages,
  [pageId]: normalizePage(patch(pages[pageId] ?? createPageState())),
});

const readPages = (): Record<string, PageFilterState> =>
  Object.fromEntries(
    Object.entries(readStoredPages()).map(([pageId, page]) => [
      pageId,
      normalizePage({
        filters: page.filters,
        variant: page.variant,
        isShowFilters: page.isShowFilters ?? false,
      }),
    ]),
  );

const savePages = (pages: Record<string, PageFilterState>) => {
  writeStoredPages(pages);
  return { pages };
};

export const useFiltersStore = create<FiltersStore>((set) => ({
  pages: readPages(),
  applyFilters: (pageId, filters, variant) =>
    set((state) =>
      savePages(
        updatePage(state.pages, pageId, (page) => ({
          ...page,
          filters,
          variant,
        })),
      ),
    ),
  resetFilters: (pageId) =>
    set((state) =>
      savePages(
        updatePage(state.pages, pageId, (page) => ({
          ...page,
          filters: undefined,
        })),
      ),
    ),
  retainFilters: (pageId) =>
    set((state) => {
      const ids = Object.keys(state.pages);

      if (!pageId) {
        return ids.length > 0 ? savePages({}) : state;
      }

      if (ids.length === 0 || (ids.length === 1 && ids[0] === pageId)) {
        return state;
      }

      const page = state.pages[pageId];
      return savePages(page ? { [pageId]: page } : {});
    }),
  removeField: (pageId, fieldId) =>
    set((state) =>
      savePages(
        updatePage(state.pages, pageId, (page) => {
          const nextFilters = { ...page.filters };
          delete nextFilters[fieldId];

          return {
            ...page,
            filters: hasFilledFilter(nextFilters) ? nextFilters : undefined,
          };
        }),
      ),
    ),
  setShowFilters: (pageId, isShowFilters) =>
    set((state) =>
      savePages(
        updatePage(state.pages, pageId, (page) => ({
          ...page,
          isShowFilters,
        })),
      ),
    ),
}));
