import { ComcRequestStatus } from "@entities/history/types";

export interface IModalHistoryConfig {
  component: React.ComponentType<{ params: IParams }>;
  title: string;
  customWidth?: string;
}

export interface IParams {
  id: string;
  type: ComcRequestStatus;
}
