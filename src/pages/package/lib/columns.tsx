import { Column } from "@admiral-ds/react-ui";
import { IPackageInfo } from "@entities/package/model";
import { PackageStatusTag } from "@entities/package/ui";
import { normalizedDate } from "@shared/lib";
import React from "react";

export const columnList: Column[] = [
  {
    name: "packageSubscriptionId",
    title: "Номер пакета",
    width: "14%",
  },
  {
    name: "packageName",
    title: "Наименование  пакета",
    width: "14%",
  },
  {
    name: "packageStatus",
    title: "Статус пакета",
    width: "14%",
    renderCell(status) {
      return <PackageStatusTag status={status} />;
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
        row as unknown as IPackageInfo;

      return `${normalizedDate(paymentPeriodFrom)} - ${normalizedDate(paymentPeriodTo)}`;
    },
  },
];
