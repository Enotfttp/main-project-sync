import { axiosInstance, toListParams } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class DocumentService {
  async getDocument(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data;
  }

  async getDocumentsPeriod(
    id: UUID,
    { filters, ...listParams }: TFilterPaginationRequest<any> = {},
  ): Promise<any> {
    const response = await axiosInstance.post(
      `/documents`,
      { ...filters },
      {
        params: { periodId: id, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocumentsPackage(
    id: UUID,
    { filters, ...listParams }: TFilterPaginationRequest<any> = {},
  ): Promise<any> {
    const response = await axiosInstance.post(
      `/documents`,
      { ...filters },
      {
        params: { packageId: id, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocumentsOption(
    id: UUID,
    { filters, ...listParams }: TFilterPaginationRequest<any> = {},
  ): Promise<any> {
    const response = await axiosInstance.post(
      `/documents`,
      { ...filters },
      {
        params: { optionId: id, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocumentHistory(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/documents/${id}/history`);
    return response.data;
  }
}

export const documentService = new DocumentService();
