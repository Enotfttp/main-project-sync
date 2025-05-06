import {useQuery} from "@tanstack/react-query";
import {IFiltersRKO, rkoService} from '../index.ts'

export const useGetRKOList = (filters?:IFiltersRKO) =>{
  return useQuery({
    queryKey:['rko-list', filters],
    queryFn: () => rkoService.getRKOList(filters),
  })
}
