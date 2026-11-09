import {
  IOptionInfoDetails,
  TOptionsPaginationResponse,
  TOptionsRequest,
} from "../model";
import { axiosInstance, toListParams } from "@shared/api";

class OptionService {
  async getOptions({
    packageSubscriptionId,
    ...listParams
  }: TOptionsRequest): Promise<TOptionsPaginationResponse> {
    const response = await axiosInstance.post(
      `/options`,
      { packageSubscriptionId },
      {
        params: toListParams(listParams),
      },
    );
    return response.data;
  }

  async getOption(id: UUID): Promise<IOptionInfoDetails> {
    const response = await axiosInstance.get(`/options/${id}`);
    return response.data;
  }
}

export const optionService = new OptionService();
