import {
  IRequestDetails,
  IRequestFilter,
  IRequestHistory,
  IRequests,
} from "../model/types";
import { axiosInstance } from "@shared/api";
import { TPaginationFilter } from "@shared/types";

class RequestService {
  async getRequests(
    filters?: TPaginationFilter<IRequestFilter>,
  ): Promise<IRequests> {
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
