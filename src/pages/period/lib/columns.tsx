import { Column } from "@admiral-ds/react-ui";
import { PeriodStatusTag, ResultTypeTag } from "@entities/schedule/ui";
import { normalizedDate } from "@shared/lib";
import React from "react";

export const columnList: Column[] = [
  {
    name: "periodId",
    title: "Идентификатор периода",
    width: "16%",
  },
  {
    name: "status",
    title: "Статус",
    width: "14%",
    renderCell(status) {
      return <PeriodStatusTag status={status} />;
    },
  },
  {
    name: "resultType",
    title: "Статус оплаты",
    width: "14%",
    renderCell(status) {
      return <ResultTypeTag status={status} />;
    },
  },
  {
    name: "startDate",
    title: "Дата начала периода действия",
    width: "13%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "endDate",
    title: "Дата начала окончания действия",
    width: "13%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "amount",
    title: "Сумма начисления",
    width: "10%",
  },
  {
    name: "additionalAmount",
    title: "Сумма доначисления",
    width: "10%",
  },
];
