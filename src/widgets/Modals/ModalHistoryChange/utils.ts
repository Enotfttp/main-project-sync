import { IStepPropsExtKey } from "./ModalHistoryChange";
import {
  ComcRequestStatus,
  ComcRequestStatusView,
} from "@entities/history/types";

/**
 * Метод генераци конфига для степпера.
 *
 * @param status - статус каждого элемента массива
 * @param currentStatus - текущий статус, который пришёл в ресте
 */
export const configGenerated = (
  status: ComcRequestStatus,
  currentStatus: ComcRequestStatus,
) => {
  const currentStatusPriority = ComcRequestStatusView[currentStatus].priority;
  const statusPriority = ComcRequestStatusView[status].priority;

  if (currentStatusPriority < statusPriority) {
    return;
  }

  return {
    [ComcRequestStatusView[status].status!]: status !== currentStatus,
    // Обход логики Stepper'а на disabled шагов со статусами warning и error
    active:
      ComcRequestStatusView[status].status === "warning" ||
      ComcRequestStatusView[status].status === "error",
  };
};

/**
 * Метод генераци конфига для степпера.
 *
 * @param index - индекс шага на который нажал пользователь
 * @param currentSteps - текущий массив степпера
 * @param currentStatus - текущий статус, который пришёл в ресте
 */
export const configGeneratedForIndex = (
  index: number,
  currentStatus: ComcRequestStatus,
  currentSteps: IStepPropsExtKey[],
): IStepPropsExtKey[] => {
  return [...currentSteps].map((step, i) => {
    const currentPriorityStatus = ComcRequestStatusView[currentStatus].priority;
    const currentStepStatus = ComcRequestStatusView[step.key].status;

    if (i < currentPriorityStatus + 1) {
      return { ...step, [currentStepStatus!]: i !== index };
    }

    return step;
  });
};
