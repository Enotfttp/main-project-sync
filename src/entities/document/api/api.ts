import { axiosInstance } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class DocumentService {
  async getDocument(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data;
  }

  async getDocumentsPeriod(
    id: UUID,
    filters?: TFilterPaginationRequest<any>,
  ): Promise<any> {
    const response = await axiosInstance.post(`/documents?periodId=${id}`, {
      filters: filters,
    });
    return response.data;
  }

  async getDocumentsPackage(
    id: UUID,
    filters?: TFilterPaginationRequest<any>,
  ): Promise<any> {
    const response = await axiosInstance.post(`/documents?packageId=${id}`, {
      filters: filters,
    });
    return response.data;
  }

  async getDocumentsOption(
    id: UUID,
    filters?: TFilterPaginationRequest<any>,
  ): Promise<any> {
    const response = await axiosInstance.post(`/documents?optionId=${id}`, {
      filters: filters,
    });
    return response.data;
  }

  async getDocumentHistory(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/documents/${id}/history`);
    return response.data;
  }
}

export const documentService = new DocumentService();
