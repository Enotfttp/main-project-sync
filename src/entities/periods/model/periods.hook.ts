import {useQuery} from "@tanstack/react-query";
import {periodsService} from '../index.ts'

export const useGetPeriodsList = () =>{
  return useQuery({
    queryKey:['Periods-list'],
    queryFn: periodsService.getPeriodsList,
  })
}
