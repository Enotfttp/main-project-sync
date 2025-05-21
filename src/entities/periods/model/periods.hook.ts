import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IPeriodsList, periodsService } from '../index.ts';

export const useGetPeriodsList = (
  id: string,
  options?: Omit<UseQueryOptions<IPeriodsList[], Error, IPeriodsList[], QueryKey>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: ['Periods-list', id],
    queryFn: () => periodsService.getPeriodsList(id),
    ...options,
  });
};
