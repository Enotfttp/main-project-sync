import { serviceConnectionService } from "../index";
import { FilterWithPagination } from "@shared/ui/TableSort/components/Pagination.types";
import { useQuery } from "@tanstack/react-query";

export const useGetConnectionList = (filters?: FilterWithPagination) => {
  return useQuery({
    queryKey: ["serviceConnection-list", filters],
    queryFn: () => serviceConnectionService.getServiceConnectionList(filters),
  });
};
