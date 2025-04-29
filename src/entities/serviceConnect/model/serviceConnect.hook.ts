import {useQuery} from "@tanstack/react-query";
import {serviceConnectionService} from "../index";

export const useGetConnectionList = (id:string) =>{
  return useQuery({
    queryKey:['serviceConnection-list'],
    queryFn: ()=>serviceConnectionService.getServiceConnectionList(id),
  })
}
