import {
  IDocumentInfoDetails,
  TDocumentsPaginationResponse,
  TDocumentsRequest,
} from "../model";
import { axiosInstance, toListParams } from "@shared/api";

class DocumentService {
  async getDocumentsPeriod({
    periodId,
    ...listParams
  }: TDocumentsRequest): Promise<TDocumentsPaginationResponse> {
    const response = await axiosInstance.post(
      `/documents`,
      {},
      {
        params: { periodId, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocumentsPackage({
    packageSubscriptionId,
    ...listParams
  }: TDocumentsRequest): Promise<TDocumentsPaginationResponse> {
    const response = await axiosInstance.post(
      `/documents`,
      {},
      {
        params: { packageSubscriptionId, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocumentsOption({
    optionSubscriptionId,
    ...listParams
  }: TDocumentsRequest): Promise<TDocumentsPaginationResponse> {
    const response = await axiosInstance.post(
      `/documents`,
      {},
      {
        params: { optionSubscriptionId, ...toListParams(listParams) },
      },
    );
    return response.data;
  }

  async getDocument(id: UUID): Promise<IDocumentInfoDetails> {
    const response = await axiosInstance.get(`/documents/${id}`);
    return response.data;
  }
}

export const documentService = new DocumentService();
