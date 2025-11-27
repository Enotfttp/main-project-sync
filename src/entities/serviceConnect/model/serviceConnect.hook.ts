import { serviceConnectionService } from "../index";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { useQuery } from "@tanstack/react-query";

export const useGetConnectionList = (filters?: FilterValue[]) => {
  return useQuery({
    queryKey: ["serviceConnection-list", filters],
    queryFn: () => serviceConnectionService.getServiceConnectionList(filters),
  });
};
