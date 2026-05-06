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
  PAYMENT_PROCESSED: {
    kind: "primary",
    text: EPeriodsStatus.PAYMENT_PROCESSED,
  },
  INCOME_NDS_PROCESSED: {
    kind: "primary",
    text: EPeriodsStatus.INCOME_NDS_PROCESSED,
  },
  INCOME_PROCESSED: {
    kind: "primary",
    text: EPeriodsStatus.INCOME_PROCESSED,
  },
  DEBT_ACCOUNTED: {
    kind: "primary",
    text: EPeriodsStatus.DEBT_ACCOUNTED,
  },
  ACCOUNTS_SETTLED: {
    kind: "primary",
    text: EPeriodsStatus.ACCOUNTS_SETTLED,
  },
  ADDITIONAL_DEBT_ACCOUNTED: {
    kind: "warning",
    text: EPeriodsStatus.ADDITIONAL_DEBT_ACCOUNTED,
  },
  PAYMENT_REFUNDED: {
    kind: "success",
    text: EPeriodsStatus.PAYMENT_REFUNDED,
  },
  ANNULLED: {
    kind: "danger",
    text: EPeriodsStatus.ANNULLED,
  },
  CARD_INDEXED: {
    kind: "primary",
    text: EPeriodsStatus.CARD_INDEXED,
  },
  DECLINED: {
    kind: "danger",
    text: EPeriodsStatus.DECLINED,
  },
  REVOKED: {
    kind: "warning",
    text: EPeriodsStatus.REVOKED,
  },
  COMPLETED: {
    kind: "success",
    text: EPeriodsStatus.COMPLETED,
  },
  CANCEL: {
    kind: "warning",
    text: EPeriodsStatus.CANCEL,
  },
  ERROR: {
    kind: "danger",
    text: EPeriodsStatus.ERROR,
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
