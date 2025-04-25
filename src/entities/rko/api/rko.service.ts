import {IRKOList} from "../index.ts";
import {axiosInstance} from "@shared/index.ts";

class RKOService{

  async getRKOList ():Promise<IRKOList[]>{
    const response =  await axiosInstance.get("api/rko-list");
    return response.data;
  }
}


export const rkoService = new RKOService();
