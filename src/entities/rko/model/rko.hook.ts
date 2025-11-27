import { rkoService } from "../index";
import { FilterValue } from "@shared/ui/Filter/Filter.types";
import { useQuery } from "@tanstack/react-query";

export const useGetRKOList = (filters?: FilterValue[]) => {
  return useQuery({
    queryKey: ["rko-list", filters],
    queryFn: () => rkoService.getRKOList(filters),
  });
};
