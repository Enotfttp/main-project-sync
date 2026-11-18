import { filterSectionId } from "./useFilters";
import { useFiltersStore } from "../model/filtersStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * На главной фильтры сбрасываются. Внутри /requests, /schedules и /packages
 * остаётся фильтр этого раздела — в том числе на вложенном пути.
 * Переход в другой раздел предыдущий фильтр удаляет.
 */
export const useSyncFiltersWithRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    useFiltersStore.getState().retainFilters(filterSectionId(pathname));
  }, [pathname]);
};
