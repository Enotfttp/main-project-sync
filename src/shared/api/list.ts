import { TFilterPaginationRequest } from "@shared/types";

/**
 * Метод для перевода пагинации и сортировки в query-параметры
 * вида `?sort=field,asc&page=1&size=25`
 *
 * @param request Пагинация и сортировка списка
 */
export const toListParams = <S extends object>({
  page,
  sort,
}: Pick<TFilterPaginationRequest<object, S>, "page" | "sort"> = {}) => ({
  page: page?.page,
  size: page?.pageSize,
  sort: sort?.map(({ field, direction }) => `${field},${direction}`),
});
