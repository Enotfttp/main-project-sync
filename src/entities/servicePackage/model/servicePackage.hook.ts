import {useQuery} from "@tanstack/react-query";
import {servicePackagesService} from '../index'

export const useGetPackagesList = (id:string) =>{
  return useQuery({
    queryKey:['servicePackage-list'],
    queryFn: ()=> servicePackagesService.getServicePackagesList(id),
  })
}
