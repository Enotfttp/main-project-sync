import axios from 'axios';
// import {endpoint} from "../../../index";

export const axiosInstance = axios.create({
  // baseURL: endpoint || import.meta.env.VITE_API_BASE_URL,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipAuthRefresh?: boolean
  }
}
