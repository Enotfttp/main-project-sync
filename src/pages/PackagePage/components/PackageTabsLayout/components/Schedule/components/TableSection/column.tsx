import { Column, DARK_THEME, LIGHT_THEME, Tag } from "@admiral-ds/react-ui";
import { EPaymentScheduleStatus } from "@entities/schedule/types";
import { findThemeStorage } from "@shared/common";
import { TTag } from "@shared/types/types";
import React from "react";

export const statusConfig = (
  theme: typeof DARK_THEME | typeof LIGHT_THEME,
): TTag<keyof typeof EPaymentScheduleStatus> => ({
  CREATED: {
    kind: {
      background: `var(--admiral-color-Neutral_Neutral50, ${theme.color["Neutral/Neutral 50"]})`,
    },
    text: EPaymentScheduleStatus.CREATED,
  },
  COMPLETED: {
    kind: "success",
    text: EPaymentScheduleStatus.COMPLETED,
  },
  CANCEL: {
    kind: "warning",
    text: EPaymentScheduleStatus.CANCEL,
  },
});

export const columnList: Column[] = [
  {
    name: "id",
    title: "Индификатор записи",
    width: "7.6%",
  },
  {
    name: "status",
    title: "Статус",
    width: "7.6%",
    renderCell: (status: string) => {
      const theme = findThemeStorage();

      const config = statusConfig(theme)[status];

      if (!config) return null;
      return <Tag kind={config.kind}>{config.text}</Tag>;
    },
  },
  {
    name: "dataName",
    title: "Наименование ПУ",
    width: "7.6%",
  },
  {
    name: "dataTrfNumber",
    title: "Номер ПУ",
    width: "7.6%",
  },
  {
    name: "utilityCurrencyTariff",
    title: "Валюта тарифа",
    width: "7.6%",
  },
  {
    name: "utilityAmountFullCur",
    title: "Общая сумма комисии с учётом скидок, без НДС",
    width: "7.6%",
  },
  {
    name: "utilityPriority",
    title: "Приоритет оплаты",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeAmountFullNds",
    title: "Общая сумма комисии с учётом скидок, с НДС",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeVatRate",
    title: "Ставка НДС",
    width: "7.6%",
  },
  {
    name: "vatDocumentTypeAmountNdsCur",
    title: "Сумма НДС в валюте тарифа",
    width: "7.6%",
  },
  {
    name: "processDocProcessCode",
    title: "Код управляющего признака",
    width: "7.6%",
  },
  {
    name: "processDocProcessStartDate",
    title: "Дата начала списания комиссии",
    width: "7.6%",
  },
  {
    name: "processDocProcessEndDate",
    title: "Дата окончания списания комиссии",
    width: "7.6%",
  },
];
