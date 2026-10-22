import { Column } from "@admiral-ds/react-ui";
import { mapEventType } from "@entities/request/model";
import { RequestStatusTag, ResultTypeTag } from "@entities/request/ui";
import { normalizedDate } from "@shared/lib";
import React from "react";

export const columnList: Column[] = [
  {
    name: "requestId",
    title: "Идентификатор",
    width: "20%",
  },
  {
    name: "date",
    title: "Дата поступления",
    width: "20%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "eventType",
    title: "Тип события",
    width: "20%",
    renderCell: (status) => {
      return mapEventType(status);
    },
  },
  {
    name: "requestStatus",
    title: "Статус запроса",
    width: "20%",
    renderCell(status) {
      return <RequestStatusTag status={status} />;
    },
  },
  {
    name: "resultType",
    title: "Результат обработки",
    width: "20%",
    renderCell(status) {
      return <ResultTypeTag status={status} />;
    },
  },
];
