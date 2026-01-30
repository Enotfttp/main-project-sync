import { StepProps } from "@admiral-ds/react-ui";
import { ComcRequestStatus, IContent } from "@entities/history/types";

export interface IModalHistoryConfig {
  component: React.ComponentType<{ params: IParams }>;
  title: string;
  customWidth?: string;
}

export interface IParams {
  id: string;
  type: ComcRequestStatus;
}

export interface IStepPropsExtKey extends StepProps {
  key: ComcRequestStatus;
  content: string;
  contentInfo?: IContent;
}
