import { rkoService } from "../index";
import { FilterWithPagination } from "@shared/ui/TableSort/components/Pagination.types";
import { useQuery } from "@tanstack/react-query";

export const useGetRKOList = (filters?: FilterWithPagination) => {
  return useQuery({
    queryKey: ["rko-list", filters],
    queryFn: () => rkoService.getRKOList(filters),
  });
};
