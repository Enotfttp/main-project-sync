import { Column } from "@admiral-ds/react-ui";
import { IOptionInfo } from "@entities/option/model";
import { OptionStatusTag } from "@entities/option/ui";
import { normalizedDate } from "@shared/lib";
import React from "react";

export const columnList: Column[] = [
  {
    name: "optionSubscriptionId",
    title: "Номер опции",
    width: "14%",
  },
  {
    name: "optionName",
    title: "Наименование  опции",
    width: "14%",
  },
  {
    name: "optionStatus",
    title: "Статус опции",
    width: "14%",
    renderCell(status) {
      return <OptionStatusTag status={status} />;
    },
  },
  {
    name: "activationDate",
    title: "Дата поступления",
    width: "14%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "deactivationDate",
    title: "Дата отключения",
    width: "14%",
    renderCell: (date) => {
      return normalizedDate(date);
    },
  },
  {
    name: "amountFullCur",
    title: "Сумма оплаты",
    width: "14%",
  },
  {
    name: "priority",
    title: "Период оплаты",
    width: "16%",
    renderCell: (_, row) => {
      const { paymentPeriodFrom, paymentPeriodTo } =
        row as unknown as IOptionInfo;

      return `${normalizedDate(paymentPeriodFrom)} - ${normalizedDate(paymentPeriodTo)}`;
    },
  },
];
