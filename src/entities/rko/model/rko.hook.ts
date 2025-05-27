import { useQuery } from '@tanstack/react-query';
import { TFiltersRKO, rkoService } from '../index.ts';

export const useGetRKOList = (filters?: TFiltersRKO) => {
  return useQuery({
    queryKey: ['rko-list', filters],
    queryFn: () => rkoService.getRKOList(filters),
  });
};
