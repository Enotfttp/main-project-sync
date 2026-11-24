import { TReportsPaginationResponse, TReportsRequest } from "../model";
import { reportsService } from "./api";
import { routesPath } from "@app/routes";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const getReportsQueryOptions = (params: TReportsRequest) => {
  let extQueryKey;
  let queryFn;
  const isNotIncomedMonthsComissions = params?.pathname.includes(
    routesPath.report.notIncomedMonthsComissions.root,
  );
  const isNotIncomedAdvancedComissions = params?.pathname.includes(
    routesPath.report.notIncomedAdvancedComissions.root,
  );
  const isNotIncomedPackageChangeComissions = params?.pathname.includes(
    routesPath.report.notIncomedPackageChangeComissions.root,
  );
  const isErrorComcRequests = params?.pathname.includes(
    routesPath.report.errorComcRequests.root,
  );
  const isCardIndexControl = params?.pathname.includes(
    routesPath.report.cardIndexControl.root,
  );
  const isValidationErrorDocuments = params?.pathname.includes(
    routesPath.report.validationErrorDocuments.root,
  );
  const isCreatedOrAcceptedDocuments = params?.pathname.includes(
    routesPath.report.createdOrAcceptedDocuments.root,
  );

  if (isNotIncomedMonthsComissions) {
    extQueryKey = "notIncomedMonthsComissions";
    queryFn = reportsService.getReportsNotIncomedMonthsComissions;
  }
  if (isNotIncomedAdvancedComissions) {
    extQueryKey = "notIncomedAdvancedComissions";
    queryFn = reportsService.getReportsNotIncomedAdvancedComissions;
  }
  if (isNotIncomedPackageChangeComissions) {
    extQueryKey = "notIncomedPackageChangeComissions";
    queryFn = reportsService.getReportsNotIncomedPackageChangeComissions;
  }
  if (isErrorComcRequests) {
    extQueryKey = "errorComcRequests";
    queryFn = reportsService.getReportsErrorComcRequests;
  }
  if (isCardIndexControl) {
    extQueryKey = "cardIndexControl";
    queryFn = reportsService.getReportsCardIndexControl;
  }
  if (isValidationErrorDocuments) {
    extQueryKey = "validationErrorDocuments";
    queryFn = reportsService.getReportsValidationErrorDocuments;
  }
  if (isCreatedOrAcceptedDocuments) {
    extQueryKey = "createdOrAcceptedDocuments";
    queryFn = reportsService.getReportsCreatedOrAcceptedDocuments;
  }

  const { pathname, ...listParams } = params;

  return {
    queryKey: ["reports", extQueryKey, listParams],
    queryFn: () => queryFn(params),
  };
};

export const useGetReports = (
  params: TReportsRequest,
  options?: Omit<
    UseQueryOptions<TReportsPaginationResponse, Error>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...getReportsQueryOptions(params),
    ...options,
    throwOnError: true,
  });
};
