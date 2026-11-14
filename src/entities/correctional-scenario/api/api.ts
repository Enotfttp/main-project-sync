import {
  IAccountInfo,
  ICorrectionRequest,
  ICorrectionalScenario,
  ICorrectionalScenarioFilter,
  ICorrectionStatus,
  TCorrectionRequestStatus,
} from "../model/types";
import { axiosInstance } from "@shared/api";

const REQUEST_TIMEOUT = 5_000;
const STATUS_ATTEMPTS = 10;
const STATUS_DELAY = 1_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    fields: IAccountInfo,
  ): Promise<ICorrectionRequest> {
    const response = await axiosInstance.patch(
      "/operations/accounts",
      { fields },
      { timeout: REQUEST_TIMEOUT },
    );
    return response.data;
  }

  async getCorrectionStatus(id: UUID): Promise<ICorrectionStatus> {
    const response = await axiosInstance.get(`/operations/${id}/status`, {
      timeout: REQUEST_TIMEOUT,
    });
    return response.data;
  }

  async updateCorrectionalScenario(
    fields: IAccountInfo,
  ): Promise<TCorrectionRequestStatus> {
    const { correctionRequestId } =
      await this.patchCorrectionalScenario(fields);
    let status: TCorrectionRequestStatus = "CREATED";

    for (let attempt = 0; attempt < STATUS_ATTEMPTS; attempt += 1) {
      ({ correctionRequestStatus: status } =
        await this.getCorrectionStatus(correctionRequestId));

      if (status !== "CREATED") return status;
      if (attempt < STATUS_ATTEMPTS - 1) await wait(STATUS_DELAY);
    }

    return status;
  }
}

export const correctionalScenarioService = new CorrectionalScenarioService();
