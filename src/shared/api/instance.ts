import axios from "axios";
import { v7 } from "uuid";

export const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-Id": v7(),
    "X-System-Code": "COMC",
  },
});

declare module "axios" {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}
