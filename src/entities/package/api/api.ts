import {
  IPackageInfoDetails,
  TPackagesPaginationResponse,
  TPackagesRequest,
} from "../model/types";
import { axiosInstance, toListParams } from "@shared/api";

class PackageService {
  async getPackages({
    filters,
    ...listParams
  }: TPackagesRequest = {}): Promise<TPackagesPaginationResponse> {
    const response = await axiosInstance.post(
      `/packages`,
      { ...filters },
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getPackage(id: UUID): Promise<IPackageInfoDetails> {
    const response = await axiosInstance.get(`/packages/${id}`);
    return response.data;
  }
}

export const packageService = new PackageService();
