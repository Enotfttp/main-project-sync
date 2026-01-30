import { ModalHistoryContent } from "./components";
import { useHistoryStepsGenerated } from "./hook";
import {
  StyledBtnWrapper,
  StyledModalHistoryChange,
} from "./ModalHistoryChange.styled";
import { IParams, IStepPropsExtKey } from "./ModalHistoryChange.types";
import { configGeneratedForIndex } from "./utils";
import { Button, Step, StepContent, Stepper } from "@admiral-ds/react-ui";
import { useGetHistory } from "@entities/history/hook";
import { ComcRequestStatusView } from "@entities/history/types";
import * as React from "react";
import { useMemo } from "react";

export const ModalHistoryChange = ({ id }: IParams) => {
  const { data: dataHistory } = useGetHistory(id);
  const [steps, setSteps] = React.useState<IStepPropsExtKey[]>([]);
  const [activeStep, setActiveStep] = React.useState(1);

  const currentStatus = useMemo(
    () =>
      dataHistory?.length
        ? dataHistory[dataHistory.length - 1].status
        : "CREATED",
    [dataHistory],
  );

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
    const newSteps = configGeneratedForIndex(index, currentStatus, steps);

    setSteps(newSteps);
    setActiveStep(index);
  };

  useHistoryStepsGenerated({
    dataHistory,
    setSteps,
    setActiveStep,
  });

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
      {Boolean(steps.length) && (
        <ModalHistoryContent
          dataHistory={dataHistory!}
          currentStep={steps[activeStep]}
        />
      )}
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
            (currentStatus &&
              activeStep === ComcRequestStatusView[currentStatus].priority)
          }
          dimension="s"
        >
          Следующий шаг
        </Button>
      </StyledBtnWrapper>
    </StyledModalHistoryChange>
  );
};
