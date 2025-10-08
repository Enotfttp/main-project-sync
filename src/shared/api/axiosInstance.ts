import axios from 'axios';

export const axiosInstance = axios.create({
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
