import { Column } from "@admiral-ds/react-ui";
import { EPaymentStatus } from "@entities/history/types";
import { normalizedDate } from "@shared/common";
import React from "react";

export const columnList: Column[] = [
  {
    name: "periodId",
    title: "Индификатор периода",
    width: "16.6%",
  },
  {
    name: "startDate",
    title: "Дата начала периода действия",
    width: "16.6%",
    type: "date",
    renderCell(startDate): React.ReactNode {
      return normalizedDate(startDate);
    },
  },
  {
    name: "endDate",
    title: "Дата окончания периода действия",
    width: "16.6%",
    type: "date",
    renderCell(endDate): React.ReactNode {
      return normalizedDate(endDate);
    },
  },
  {
    name: "status",
    title: "Статус оплаты периода",
    width: "16.6%",
    sortable: true,
    renderCell(status): React.ReactNode {
      return EPaymentStatus[status];
    },
  },
  {
    name: "interimAccountPostDate",
    title: "Дата-время отнесения суммы на промежуточный счет",
    width: "16.6%",
    type: "date",
    renderCell(interimAccountPostDate): React.ReactNode {
      return normalizedDate(interimAccountPostDate, true);
    },
  },
  {
    name: "bankIncomeAccountPostDate",
    title: "Дата-время отнесения суммы на счет доходов банка",
    width: "16.6%",
    type: "date",
    renderCell(bankIncomeAccountPostDate): React.ReactNode {
      return normalizedDate(bankIncomeAccountPostDate, true);
    },
  },
];
