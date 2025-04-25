import {IServicePackagesList} from "../index.ts";
import {axiosInstance} from "@shared/index.ts";

class ServicePackagesService {

  async getServicePackagesList (id:string):Promise<IServicePackagesList[]>{
    const response =  await axiosInstance.get(`/api/service-connect/${id}`);
    return response.data;
  }
}


export const servicePackagesService = new ServicePackagesService();
