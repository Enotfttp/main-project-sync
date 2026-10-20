import {
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  TRequestsPaginationResponse,
} from "../model/types";
import { axiosInstance } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class RequestService {
  async getRequests(
    filters?: TFilterPaginationRequest<IRequestFilter>,
  ): Promise<TRequestsPaginationResponse> {
    const response = await axiosInstance.post(`/requests`, {
      filters: filters,
    });
    return response.data;
  }

  async getRequest(id?: string): Promise<IRequestDetails> {
    const response = await axiosInstance.get(`/requests/${id}`);
    return response.data;
  }

  async getRequestHistory(id?: string): Promise<IRequestHistory> {
    const response = await axiosInstance.get(`/requests/${id}/history`);
    return response.data;
  }
}

export const requestService = new RequestService();
