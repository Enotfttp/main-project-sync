import { TReportsPaginationResponse, TReportsRequest } from "../model";
import { axiosInstance, toListParams } from "@shared/api";

class ReportsService {
  async getReportsNotIncomedMonthsComissions({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(
      `/reports/not-incomed-months-comissions`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getReportsNotIncomedAdvancedComissions({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(
      `/reports/not-incomed-advanced-comissions`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getReportsNotIncomedPackageChangeComissions({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(
      `/reports/not-incomed-package-change-comissions`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getReportsErrorComcRequests({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(`/reports/error-comc-requests`, {
      params: toListParams(listParams),
    });
    return response.data;
  }

  async getReportsCardIndexControl({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(`/reports/card-index-control`, {
      params: toListParams(listParams),
    });
    return response.data;
  }

  async getReportsValidationErrorDocuments({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(
      `/reports/validation-error-documents`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getReportsCreatedOrAcceptedDocuments({
    ...listParams
  }: TReportsRequest): Promise<TReportsPaginationResponse> {
    const response = await axiosInstance.get(
      `/reports/created-or-accepted-documents`,
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }
}

export const reportsService = new ReportsService();
