import { eventsService, IEventsList } from "../index";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetEventsList = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IEventsList>,
      Error,
      TableDataWithPagination<IEventsList>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["events-list", filters],
    queryFn: () => eventsService.getEventsList(filters),
    ...options,
  });
};
