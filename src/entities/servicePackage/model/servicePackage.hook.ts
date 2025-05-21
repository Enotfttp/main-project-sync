import { useQuery } from '@tanstack/react-query';
import { servicePackagesService } from '../index';
import { TFiltersServicePackage } from '@entities/servicePackage';

export const useGetPackagesList = (filters?: TFiltersServicePackage) => {
  return useQuery({
    queryKey: ['servicePackage-list', filters],
    queryFn: () => servicePackagesService.getServicePackagesList(filters),
  });
};
