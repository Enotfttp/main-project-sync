import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { eventsService, IEventsList, TFiltersEvents } from '../index.ts';

export const useGetEventsList = (
  filters?: TFiltersEvents,
  options?: Omit<UseQueryOptions<IEventsList[], Error, IEventsList[], QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['events-list', filters],
    queryFn: () => eventsService.getEventsList(filters),
    ...options,
  });
};
