import { IStepPropsExtKey } from "./ModalHistoryChange.types";
import {
  ComcRequestStatusView,
  EComcRequestStatus,
  IRequestHistory,
} from "@entities/history/types";

/**
 * Метод генераци конфига для степпера.
 *
 * @param dataHistory - Информация, которая пришла из реста по истории изменения
 */
export const configGenerated = (dataHistory: IRequestHistory[]) => {
  const currentStatus = dataHistory[dataHistory.length - 1].status;
  const currentStatusPriority = ComcRequestStatusView[currentStatus].priority;
  let prevStatusPriority = 0;

  if (dataHistory.length > 1) {
    const prevStatus = dataHistory[dataHistory.length - 2].status;
    prevStatusPriority = ComcRequestStatusView[prevStatus].priority;
  }

  const allSteps = Object.entries(EComcRequestStatus).map(([key, val]) => {
    const statusPriority = ComcRequestStatusView[key].priority;

    if (currentStatus === "ERROR" || currentStatus === "REJECTED") {
      if (prevStatusPriority >= statusPriority) {
        return {
          [ComcRequestStatusView[key].status!]: true,
          active: true,
          key: key,
          content: val,
        };
      }
    }

    if (
      !["ERROR", "REJECTED"].includes(currentStatus) &&
      !["ERROR", "REJECTED"].includes(key)
    ) {
      return {
        [ComcRequestStatusView[key].status!]:
          currentStatusPriority > statusPriority,
        active: currentStatusPriority >= statusPriority,
        key: key,
        content: val,
      };
    }
  });

  if (["ERROR", "REJECTED"].includes(currentStatus)) {
    allSteps.push({
      [ComcRequestStatusView[currentStatus as string].status]: true,
      active: true,
      key: currentStatus,
      content: EComcRequestStatus[currentStatus],
    });
  }

  return allSteps.filter((el) => el) as IStepPropsExtKey[];
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
  currentStatus: keyof typeof EComcRequestStatus,
  currentSteps: IStepPropsExtKey[],
): IStepPropsExtKey[] => {
  return [...currentSteps].map((step, i) => {
    const currentPriorityStatus = ComcRequestStatusView[currentStatus].priority;
    const currentStepStatus = ComcRequestStatusView[step.key].status;

    if (i < currentPriorityStatus) {
      return { ...step, [currentStepStatus!]: i !== index };
    }

    return step;
  });
};
