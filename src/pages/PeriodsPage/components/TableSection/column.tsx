import { Column, Tag } from "@admiral-ds/react-ui";
import { EPeriodsResultType, EPeriodsStatus } from "@entities/periods/types";
import { TTag } from "@shared/types/types";
import React from "react";

export const resultStatusConfig: TTag<keyof typeof EPeriodsResultType> = {
  ITERIM_ACCOUNT: {
    kind: "warning",
    text: EPeriodsResultType.ITERIM_ACCOUNT,
  },
  BANK_INCOME_ACCOUNT: {
    kind: "success",
    text: EPeriodsResultType.BANK_INCOME_ACCOUNT,
  },
  ANNULMENT: {
    kind: "danger",
    text: EPeriodsResultType.ANNULMENT,
  },
};

export const statusConfig: TTag<keyof typeof EPeriodsStatus> = {
  CREATED: {
    kind: "primary",
    text: EPeriodsStatus.CREATED,
  },
  COMPLETED: {
    kind: "success",
    text: EPeriodsStatus.COMPLETED,
  },
  CANCEL: {
    kind: "warning",
    text: EPeriodsStatus.CANCEL,
  },
};

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
    renderCell: (status: string) => {
      const config = resultStatusConfig[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
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
    renderCell: (status: string) => {
      const config = statusConfig[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
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
