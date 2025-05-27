import { useQuery } from '@tanstack/react-query';
import { serviceConnectionService, TFiltersServiceConnection } from '../index';

export const useGetConnectionList = (filters?: TFiltersServiceConnection) => {
  return useQuery({
    queryKey: ['serviceConnection-list', filters],
    queryFn: () => serviceConnectionService.getServiceConnectionList(filters),
  });
};
