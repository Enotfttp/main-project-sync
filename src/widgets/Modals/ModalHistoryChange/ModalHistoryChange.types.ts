import { StepProps } from "@admiral-ds/react-ui";
import { EComcRequestStatus, IContent } from "@entities/history/types";

export interface IModalHistoryConfig {
  component: React.ComponentType<{ params: IParams }>;
  title: string;
  customWidth?: string;
}

export interface IParams {
  id: string;
  type: keyof typeof EComcRequestStatus;
}

export interface IStepPropsExtKey extends StepProps {
  key: keyof typeof EComcRequestStatus;
  content: string;
  contentInfo?: IContent;
}
