import { IDocuments } from "./types";
import { axiosInstance } from "@shared/api";
import {
  FilterWithPagination,
  TableDataWithPagination,
} from "@shared/ui/TableSort/components/Pagination.types";

class DocumentsService {
  async getDocuments(
    filters?: FilterWithPagination,
  ): Promise<TableDataWithPagination<IDocuments>> {
    const response = await axiosInstance.post(`/api/documents`, {
      filters: filters,
    });
    return response.data;
  }
}

export const documentsService = new DocumentsService();
