import {
  IAccountInfo,
  ICorrectionalScenario,
  ICorrectionalScenarioFilter,
} from "../model/types";
import { axiosInstance } from "@shared/api";

class CorrectionalScenarioService {
  async getCorrectionalScenario(
    filters?: ICorrectionalScenarioFilter,
  ): Promise<ICorrectionalScenario> {
    const response = await axiosInstance.post("/operations/accounts", {
      filters,
    });
    return response.data;
  }

  async patchCorrectionalScenario(
    id: UUID,
    fields: IAccountInfo,
  ): Promise<void> {
    const response = await axiosInstance.patch(`/operations/accounts/${id}`, {
      fields,
    });
    return response.data;
  }
}

export const correctionalScenarioService = new CorrectionalScenarioService();
