import {IPeriodsList} from "../index.ts";
import {axiosInstance} from "@shared/index.ts";

class PeriodsService {

  async getPeriodsList ():Promise<IPeriodsList[]>{
    const response =  await axiosInstance.get("api/periods-list");
    return response.data;
  }
}


export const periodsService = new PeriodsService();
