import axios from "axios";
import { v7 } from "uuid";

export const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-Id": v7(),
    "X-System-Code": "COMC",
  },
  // Массивы без индексов: sort=a,asc&sort=b,desc
  paramsSerializer: { indexes: null },
});

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}
