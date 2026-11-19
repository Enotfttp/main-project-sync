import axios from "axios";
import { v7 } from "uuid";

const servers = {
  dev1: "comc-dev1",
  dev2: "comc-dev2",
  st01: "comc-st01",
  st02: "comc-st02",
  ift1: "comc-ift1",
};

type ServerName = (typeof servers)[keyof typeof servers];

const API_BY_STAND: Record<ServerName, string> = {
  dev1: "https://ms-comc-service-package-ui.comc-dev1.innodev.local",
  dev2: "https://ms-comc-service-package-ui.comc-dev2.innodev.local",
  st01: "https://ms-comc-service-package-ui.comc-st01.innodev.local",
  st02: "https://ms-comc-service-package-ui.comc-st02.innodev.local",
  ift1: "https://ms-comc-service-package-ui.comc-ift1.test.vtb.ru",
};

export const chooseServerUrl = () => {
  const origin = window.location.origin;
  let res = origin;

  Object.entries(servers).forEach(([key, value]) => {
    if (key === "dev1") {
      res = API_BY_STAND[key];
    }
  });

  return res;
};

export const axiosInstance = axios.create({
  baseURL: `${chooseServerUrl()}/api/v1`,
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
