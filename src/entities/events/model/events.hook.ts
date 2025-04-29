import {useQuery} from "@tanstack/react-query";
import {eventsService} from '../index.ts'

export const useGetEventsList = () =>{
  return useQuery({
    queryKey:['events-list'],
    queryFn: eventsService.getEventsList,
  })
}
