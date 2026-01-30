import { IStepPropsExtKey } from "./ModalHistoryChange.types";
import { configGenerated } from "./utils";
import { IRequestHistory } from "@entities/history/types";
import { useEffect } from "react";

interface IProps {
  dataHistory?: IRequestHistory[];
  setSteps: React.Dispatch<React.SetStateAction<IStepPropsExtKey[]>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

export const useHistoryStepsGenerated = ({
  dataHistory,
  setSteps,
  setActiveStep,
}: IProps) => {
  useEffect(() => {
    if (!dataHistory?.length) {
      // Можно сбросить шаги или установить по умолчанию
      setSteps([]);
      setActiveStep(0);
      return;
    }

    try {
      const newSteps = configGenerated(dataHistory);

      if (!Array.isArray(newSteps) || newSteps.length === 0) {
        setSteps([]);
        setActiveStep(0);
        return;
      }

      setSteps(newSteps);

      const currentStatus = dataHistory[dataHistory.length - 1].status;
      const activeStep = newSteps.findIndex((el) => el.key === currentStatus);

      setActiveStep(activeStep);
    } catch (_) {
      setSteps([]);
      setActiveStep(0);
    }
  }, [dataHistory, setSteps, setActiveStep]);
};
