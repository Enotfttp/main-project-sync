import { documentService } from "./api";
import {
  IDocumentInfoInfoDetails,
  TDocumentsPaginationResponse,
  TDocumentsRequest,
} from "../model";
import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";

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
  return useSuspenseQuery({
    ...getDocumentsQueryOptions(params),
    ...options,
  });
};

export const useGetDocument = (
  id: UUID,
  options?: Omit<
    UseQueryOptions<IDocumentInfoInfoDetails, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: ["document", id],
    queryFn: () => documentService.getDocument(id),
    ...options,
  });
};
