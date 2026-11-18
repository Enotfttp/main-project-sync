import { TPaginationTable, TSort, TTableSort } from "@shared/types";
import { useCallback, useState } from "react";

/**
 * Страница и сортировка списка. Сортировка — выбранные столбцы,
 * их имена уходят в query как есть.
 */
export const useServerSort = <T extends object>() => {
  const [page, setPage] = useState<TPaginationTable>();
  const [sort, setSort] = useState<TSort<T>[]>();

  const handlePaginationChange = useCallback((next: TPaginationTable) => {
    setPage(next);
  }, []);

  const handleSortChange = useCallback((next: TTableSort[]) => {
    setSort(next.length ? (next as TSort<T>[]) : undefined);
  }, []);

  return { page, sort, handlePaginationChange, handleSortChange };
};
