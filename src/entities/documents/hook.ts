import { documentsService } from "./api";
import { IDocuments } from "./types";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";
import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetDocuments = (
  filters?: FilterWithPagination,
  options?: Omit<
    UseQueryOptions<
      TableDataWithPagination<IDocuments>,
      Error,
      TableDataWithPagination<IDocuments>,
      QueryKey
    >,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["documents", filters],
    queryFn: () => documentsService.getDocuments(filters),
    ...options,
  });
};
