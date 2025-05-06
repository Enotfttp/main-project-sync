import {QueryKey, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {eventsService, IEventsList} from '../index.ts'

export const useGetEventsList = (id: string,  options?: Omit<UseQueryOptions<IEventsList[], Error, IEventsList[], QueryKey>,'queryKey'| 'queryFn'>) =>{
  return useQuery({
    queryKey:['events-list', id],
    queryFn: () => eventsService.getEventsList(id),
    ...options
  })
}
