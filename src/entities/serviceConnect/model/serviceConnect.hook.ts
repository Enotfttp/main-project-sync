import { serviceConnectionService, TFiltersServiceConnection } from "../index";
import { useQuery } from "@tanstack/react-query";

export const useGetConnectionList = (filters?: TFiltersServiceConnection) => {
  return useQuery({
    queryKey: ["serviceConnection-list", filters],
    queryFn: () => serviceConnectionService.getServiceConnectionList(filters),
  });
};
