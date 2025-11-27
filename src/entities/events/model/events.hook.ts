import { eventsService, IEventsList } from "../index";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetEventsList = (
  filters?: FilterValue[],
  options?: Omit<
    UseQueryOptions<IEventsList[], Error, IEventsList[], QueryKey>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["events-list", filters],
    queryFn: () => eventsService.getEventsList(filters),
    ...options,
  });
};
