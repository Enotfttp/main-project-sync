import { columnList } from "./columns";
import { IStepPropsExtKey } from "../../ModalHistoryChange.types";
import { IRequestHistory } from "@entities/history/types";
import { addIdTableRowData, normalizedDate } from "@shared/common";
import { TableSort } from "@shared/ui";
import React, { useMemo } from "react";

interface IProps {
  dataHistory: IRequestHistory[];
  currentStep: IStepPropsExtKey;
}

export const ModalHistoryContent: React.FC<IProps> = ({
  dataHistory,
  currentStep,
}) => {
  const activeStep = currentStep.key;
  const content = useMemo(
    () => dataHistory.find((history) => history.status === activeStep)?.content,
    [dataHistory],
  );

  if (!content) return null;

  switch (activeStep) {
    case "CREATED":
      return <>Ваш запрос был создан {normalizedDate(content.eventDateTime)}</>;
    case "ACCEPTED":
      return (
        <>
          Ваш запрос находится на этапе обработки с{" "}
          {normalizedDate(content.eventDateTime)}
        </>
      );
    case "REJECTED":
      return (
        <>
          <p>Запрос вернул ошибку с кодом {content.error.errorCode}</p>
          <p>Сообщение ошибки - {content.error.errorMessage}</p>
        </>
      );
    case "PROCESSED":
      if (!content.result?.payments) return null;
      return (
        <TableSort
          columnList={columnList}
          rowList={addIdTableRowData("periodId", content.result.payments)}
          queryKey="history"
        />
      );
    case "COMPLETED":
      return <>Ваш запрос был успешно завершен!</>;
    case "ERROR":
      return (
        <>
          <p>Запрос вернул ошибку с кодом {content.error.errorCode}</p>
          <p>Сообщение ошибки - {content.error.errorMessage}</p>
        </>
      );
    default:
      return null;
  }
};
