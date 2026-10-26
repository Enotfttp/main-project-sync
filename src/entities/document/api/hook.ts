import { documentService } from "./api";
import { TFilterPaginationRequest } from "@shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetDocument = (
  id: UUID,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => documentService.getDocument(id),
    ...options,
  });
};

export const useGetDocumentsPeriod = (
  id: UUID,
  filters?: TFilterPaginationRequest<any>,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["documents", "period", id, filters],
    queryFn: () => documentService.getDocumentsPeriod(id, filters),
    ...options,
  });
};

export const useGetDocumentsPackage = (
  id: UUID,
  filters?: TFilterPaginationRequest<any>,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["documents", "package", id, filters],
    queryFn: () => documentService.getDocumentsPackage(id, filters),
    ...options,
  });
};

export const useGetDocumentsOption = (
  id: UUID,
  filters?: TFilterPaginationRequest<any>,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["documents", "option", id, filters],
    queryFn: () => documentService.getDocumentsOption(id, filters),
    ...options,
  });
};

export const useGetDocumentHistory = (
  id: UUID,
  options?: Omit<UseQueryOptions<any, Error>, "queryKey" | "queryFn">,
) => {
  return useQuery({
    queryKey: ["documents", "history", id],
    queryFn: () => documentService.getDocumentHistory(id),
    ...options,
  });
};
