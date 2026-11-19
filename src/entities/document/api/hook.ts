import { documentService } from "./api";
import {
  IDocumentInfoDetails,
  TDocumentsPaginationResponse,
  TDocumentsRequest,
} from "../model";
import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query";

const getDocumentsQueryOptions = (params: TDocumentsRequest) => {
  let extQueryKey;
  let queryFn;

  if (params?.periodId) {
    extQueryKey = "period";
    queryFn = documentService.getDocumentsPeriod;
  }
  if (params?.packageSubscriptionId) {
    extQueryKey = "package";
    queryFn = documentService.getDocumentsPackage;
  }
  if (params?.optionSubscriptionId) {
    extQueryKey = "option";
    queryFn = documentService.getDocumentsOption;
  }
  if (params?.mergedDocumentId) {
    extQueryKey = "merged";
    queryFn = documentService.getDocumentsMerged;
  }

  return {
    queryKey: ["documents", extQueryKey, params],
    queryFn: () => queryFn(params),
  };
};

export const useGetDocuments = (
  params: TDocumentsRequest,
  options?: Omit<
    UseQueryOptions<TDocumentsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...getDocumentsQueryOptions(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetDocument = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IDocumentInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["document", id],
    queryFn: () => documentService.getDocument(id),
    ...options,
  });
};
