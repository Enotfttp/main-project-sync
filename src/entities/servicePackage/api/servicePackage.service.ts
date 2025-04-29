import {IServicePackageList} from "../index";
import {axiosInstance} from "@shared/index";

class ServicePackageService {

  async getServicePackagesList (id:string):Promise<IServicePackageList[]>{
    const response =  await axiosInstance.get(`/api/service-packages/${id}`);
    return response.data;
  }
}


export const servicePackagesService = new ServicePackageService();
