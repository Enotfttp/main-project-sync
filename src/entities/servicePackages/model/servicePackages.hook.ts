import {useQuery} from "@tanstack/react-query";
import {servicePackagesService} from '../index.ts'

export const useGetServicePackagesList = (id:string) =>{
  return useQuery({
    queryKey:['servicePackages-list'],
    queryFn: ()=>servicePackagesService.getServicePackagesList(id),
  })
}
