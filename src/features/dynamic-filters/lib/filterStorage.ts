import { TFilterValue } from "../model/DynamicFilters.types";

const STORAGE_KEY = "dynamic-filters";

export interface StoredFilterPage {
  filters?: TFilterValue;
  variant?: string;
  isShowFilters?: boolean;
}

const canUseStorage = () => typeof sessionStorage !== "undefined";

export const readStoredPages = (): Record<string, StoredFilterPage> => {
  if (!canUseStorage()) return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw) as {
      pages?: Record<string, StoredFilterPage>;
    };
    const pages = parsed?.pages;

    if (!pages || typeof pages !== "object") return {};

    return pages;
  } catch {
    return {};
  }
};

export const writeStoredPages = (pages: Record<string, StoredFilterPage>) => {
  if (!canUseStorage()) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ pages }));
  } catch {
    // Приватный режим или переполненное хранилище не должны ломать фильтр.
  }
};
