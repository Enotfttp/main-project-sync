import { IRequestType } from "./types";
import { axiosInstance } from "@shared/api";

class Api {
  async getRequestTypes(id: string): Promise<IRequestType[]> {
    const response = await axiosInstance.get(
      `/api/request-types/packages/${id}`,
    );
    return response.data;
  }

  async getRequestType(id?: string): Promise<IRequestType> {
    const response = await axiosInstance.get(
      `/api/request-types/${Number(id)}`,
    );
    return response.data;
  }
}

export const requestTypesService = new Api();
