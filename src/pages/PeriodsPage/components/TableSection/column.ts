import { Column } from "@admiral-ds/react-ui";
import {
  PeriodsResultTypeText,
  PeriodsStatusText,
} from "@entities/periods/types";
import React from "react";

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "14.2%",
  },
  {
    name: "resultType",
    title: "Статус оплаты",
    width: "14.2%",
    renderCell(resultType): React.ReactNode {
      return PeriodsResultTypeText[resultType];
    },
  },
  {
    name: "startDate",
    title: "Дата начала периода действия",
    width: "14.2%",
  },
  {
    name: "endDate",
    title: "Дата окончания периода действия",
    width: "14.2%",
  },
  {
    name: "status",
    title: "Статус",
    width: "14.2%",
    renderCell(status): React.ReactNode {
      return PeriodsStatusText[status];
    },
  },
  {
    name: "amount",
    title: "Сумма начисления в валюте",
    width: "14.2%",
  },
  {
    name: "additionalAmount",
    title: "Сумма доначисления в валюте",
    width: "14.2%",
  },
];
