import {useQuery} from "@tanstack/react-query";
import {rkoService} from '../index.ts'

export const useGetRKOList = () =>{
  return useQuery({
    queryKey:['rko-list'],
    queryFn: rkoService.getRKOList,
  })
}
