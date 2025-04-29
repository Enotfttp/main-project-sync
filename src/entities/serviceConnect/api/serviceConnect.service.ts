import {axiosInstance} from "@shared/index.ts";
import {IServiceConnectionList} from "../index";

class ServiceConnectService {

  async getServiceConnectionList (id:string):Promise<IServiceConnectionList[]>{
    const response =  await axiosInstance.get(`/api/service-connects/${id}`);
    return response.data;
  }
}


export const serviceConnectionService = new ServiceConnectService();
