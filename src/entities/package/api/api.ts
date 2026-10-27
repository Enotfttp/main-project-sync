import { IPackageInfo, TPackagePaginationResponse } from "../model/types";
import { axiosInstance, toListParams } from "@shared/api";
import { TFilterPaginationRequest } from "@shared/types";

class PackageService {
  async getPackages({
    filters,
    ...listParams
  }: TFilterPaginationRequest<
    IPackageInfo,
    IPackageInfo
  > = {}): Promise<TPackagePaginationResponse> {
    const response = await axiosInstance.post(
      `/packages`,
      { ...filters },
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getPackage(id: UUID): Promise<any> {
    const response = await axiosInstance.get(`/packages/${id}`);
    return response.data;
  }

  async getPackageOptions(
    id: UUID,
    { filters, ...listParams }: TFilterPaginationRequest<any> = {},
  ): Promise<any> {
    const response = await axiosInstance.post(
      `/packages/${id}/options`,
      { ...filters },
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }
}

export const packageService = new PackageService();
