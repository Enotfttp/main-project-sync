import {
  ICorrectionalScenario,
  ICorrectionalScenarioFilter,
} from "../model/types";
import { axiosInstance } from "@shared/api";

class CorrectionalScenarioService {
  async getCorrectionalScenario(
    filters?: ICorrectionalScenarioFilter,
  ): Promise<ICorrectionalScenario> {
    const response = await axiosInstance.post("/correctional-scenario", {
      filters,
    });
    return response.data;
  }
}

export const correctionalScenarioService = new CorrectionalScenarioService();
