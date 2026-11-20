import { TReportsPaginationResponse, TReportsRequest } from "../model";
import { reportsService } from "./api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetReportsNotIncomedMonthsComissions = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "not-incomed-months-comissions", params],
    queryFn: () => reportsService.getReportsNotIncomedMonthsComissions(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsNotIncomedAdvancedComissions = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "not-incomed-advanced-comissions", params],
    queryFn: () =>
      reportsService.getReportsNotIncomedAdvancedComissions(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsNotIncomedPackageChangeComissions = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "not-incomed-package-change-comissions", params],
    queryFn: () =>
      reportsService.getReportsNotIncomedPackageChangeComissions(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsErrorComcRequests = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "error-comc-requests", params],
    queryFn: () => reportsService.getReportsErrorComcRequests(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsCardIndexControl = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "card-index-control", params],
    queryFn: () => reportsService.getReportsCardIndexControl(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsValidationErrorDocuments = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "validation-error-documents", params],
    queryFn: () => reportsService.getReportsValidationErrorDocuments(params),
    ...options,
    throwOnError: true,
  });
};

export const useGetReportsCreatedOrAcceptedDocuments = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: ["reports", "created-or-accepted-documents", params],
    queryFn: () => reportsService.getReportsCreatedOrAcceptedDocuments(params),
    ...options,
    throwOnError: true,
  });
};
