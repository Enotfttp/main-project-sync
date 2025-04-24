import {IUser} from "../index";
import {axiosInstance} from "@shared/index";

class UerService{

  async getUsers ():Promise<IUser[]>{
    const response =  await axiosInstance.get("/users");
    return response.data;
  }
}


export const userService = new UerService();
