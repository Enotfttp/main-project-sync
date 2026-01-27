import { ModalHistoryContent } from "./components";
import {
  StyledBtnWrapper,
  StyledModalHistoryChange,
} from "./ModalHistoryChange.styled";
import { IParams } from "./ModalHistoryChange.types";
import { configGenerated, configGeneratedForIndex } from "./utils";
import {
  Button,
  Step,
  StepContent,
  Stepper,
  StepProps,
} from "@admiral-ds/react-ui";
import { useGetHistory } from "@entities/history/hook";
import {
  ComcRequestStatus,
  ComcRequestStatusText,
  ComcRequestStatusView,
} from "@entities/history/types";
import * as React from "react";
import { useEffect } from "react";

export interface IStepPropsExtKey extends StepProps {
  key: ComcRequestStatus;
  content: string;
}

export const ModalHistoryChange = ({ id }: IParams) => {
  const { data: dataHistory } = useGetHistory(id);
  const [steps, setSteps] = React.useState<IStepPropsExtKey[]>([]);
  const [activeStep, setActiveStep] = React.useState(1);

  const handleStepClick = ({
    index,
  }: {
    index: number;
    active: boolean;
    completed: boolean;
    disabled?: boolean;
  }) => {
    handleChangeStep(index);
  };

  const handleChangeStep = (index) => {
    if (!dataHistory?.status) return;

    const newSteps = configGeneratedForIndex(index, dataHistory.status, steps);

    setSteps(newSteps);
    setActiveStep(index);
  };

  useEffect(() => {
    if (!dataHistory?.status) return;
    const newSteps = Object.entries(ComcRequestStatusText).map(([key, val]) => {
      const config = configGenerated(
        key as ComcRequestStatus,
        dataHistory?.status,
      );

      return {
        key: key,
        content: val,
        ...config,
      };
    }) as IStepPropsExtKey[];

    setSteps(newSteps);
    setActiveStep(ComcRequestStatusView[dataHistory.status].priority);
  }, [dataHistory]);

  return (
    <StyledModalHistoryChange>
      <Stepper activeStep={activeStep}>
        {Boolean(steps.length) &&
          steps.map((step) => (
            <Step {...step} active={step.active} onClick={handleStepClick}>
              <StepContent>{step.content as string}</StepContent>
            </Step>
          ))}
      </Stepper>
      {dataHistory && <ModalHistoryContent dataHistory={dataHistory} />}
      <StyledBtnWrapper>
        <Button
          onClick={() => {
            const index = Math.max(0, activeStep - 1);
            handleChangeStep(index);
          }}
          disabled={activeStep === 0}
          dimension="s"
        >
          Предыдущий шаг
        </Button>
        <Button
          onClick={() => {
            const index = Math.min(steps.length - 1, activeStep + 1);
            handleChangeStep(index);
          }}
          disabled={
            activeStep === steps.length - 1 ||
            (dataHistory?.status &&
              activeStep ===
                ComcRequestStatusView[dataHistory?.status].priority)
          }
          dimension="s"
        >
          Следующий шаг
        </Button>
      </StyledBtnWrapper>
    </StyledModalHistoryChange>
  );
};
